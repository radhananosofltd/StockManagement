using Microsoft.AspNetCore.Mvc;

namespace StockManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SessionConfigController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<SessionConfigController> _logger;

        public SessionConfigController(IConfiguration configuration, ILogger<SessionConfigController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<object> GetSessionConfig()
        {
            try
            {
                var timeoutMinutes = _configuration.GetValue<int>("SessionTimeout:TimeoutMinutes", 30);
                var warningMinutes = _configuration.GetValue<int>("SessionTimeout:WarningMinutes", 2);

                var config = new
                {
                    timeoutMinutes = timeoutMinutes,
                    warningMinutes = warningMinutes,
                    timestamp = DateTimeOffset.UtcNow
                };

                _logger.LogInformation("Session config requested - Timeout: {TimeoutMinutes}min, Warning: {WarningMinutes}min", 
                    timeoutMinutes, warningMinutes);

                return Ok(config);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving session configuration");
                return StatusCode(500, new { error = "Failed to retrieve session configuration" });
            }
        }
    }
}