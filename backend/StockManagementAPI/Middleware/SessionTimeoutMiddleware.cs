using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace StockManagementAPI.Middleware
{
    public class SessionTimeoutMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<SessionTimeoutMiddleware> _logger;
        private readonly IConfiguration _configuration;

        public SessionTimeoutMiddleware(RequestDelegate next, ILogger<SessionTimeoutMiddleware> logger, IConfiguration configuration)
        {
            _next = next;
            _logger = logger;
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Skip session timeout check for authentication endpoints
            if (IsAuthenticationEndpoint(context.Request.Path))
            {
                await _next(context);
                return;
            }

            // Check if user is authenticated
            if (context.User?.Identity?.IsAuthenticated == true)
            {
                var sessionTimeout = GetSessionTimeout();
                var lastActivity = GetLastActivity(context);
                var currentTime = DateTimeOffset.UtcNow;

                if (lastActivity.HasValue)
                {
                    var timeSinceLastActivity = currentTime - lastActivity.Value;
                    
                    if (timeSinceLastActivity > sessionTimeout)
                    {
                        _logger.LogWarning("Session expired for user. Last activity: {LastActivity}, Current time: {CurrentTime}", 
                            lastActivity, currentTime);
                        
                        await HandleSessionTimeout(context);
                        return;
                    }
                }

                // Update last activity time
                UpdateLastActivity(context, currentTime);
            }

            await _next(context);
        }

        private bool IsAuthenticationEndpoint(PathString path)
        {
            var authPaths = new[] { "/api/auth", "/api/login", "/api/signup", "/api/forgot-password", "/api/reset-password" };
            return authPaths.Any(authPath => path.StartsWithSegments(authPath, StringComparison.OrdinalIgnoreCase));
        }

        private TimeSpan GetSessionTimeout()
        {
            var timeoutMinutes = _configuration.GetValue<int>("SessionTimeout:TimeoutMinutes", 30);
            return TimeSpan.FromMinutes(timeoutMinutes);
        }

        private DateTimeOffset? GetLastActivity(HttpContext context)
        {
            if (context.Session.TryGetValue("LastActivity", out var lastActivityBytes))
            {
                var lastActivityString = System.Text.Encoding.UTF8.GetString(lastActivityBytes);
                if (DateTimeOffset.TryParse(lastActivityString, out var lastActivity))
                {
                    return lastActivity;
                }
            }
            return null;
        }

        private void UpdateLastActivity(HttpContext context, DateTimeOffset currentTime)
        {
            var lastActivityString = currentTime.ToString("O"); // ISO 8601 format
            var lastActivityBytes = System.Text.Encoding.UTF8.GetBytes(lastActivityString);
            context.Session.Set("LastActivity", lastActivityBytes);
        }

        private async Task HandleSessionTimeout(HttpContext context)
        {
            context.Response.StatusCode = 401;
            context.Response.ContentType = "application/json";

            var response = new
            {
                error = "Session timeout",
                message = "Your session has expired due to inactivity. Please log in again.",
                timestamp = DateTimeOffset.UtcNow
            };

            var jsonResponse = JsonSerializer.Serialize(response);
            await context.Response.WriteAsync(jsonResponse);
        }
    }
}