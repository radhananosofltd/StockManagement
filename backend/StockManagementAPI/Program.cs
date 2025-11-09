using Microsoft.EntityFrameworkCore;
using Stock_Management_Business.Interface;
using Stock_Management_Business.Service;
using Stock_Management_DataAccess.Interfaces;
using Stock_Management_DataAccess.Repositories;
using Stock_Management_DataAccess;
using Microsoft.Extensions.DependencyInjection;
using Stock_Management_Business.Mapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using StockManagementAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Configure URLs
builder.WebHost.UseUrls("http://localhost:5134");
//builder.WebHost.UseUrls("http://0.0.0.0:5000");
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add session services
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    var sessionTimeoutMinutes = builder.Configuration.GetValue<int>("SessionTimeout:TimeoutMinutes", 30);
    options.IdleTimeout = TimeSpan.FromMinutes(sessionTimeoutMinutes);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.Lax;
});

// Add JWT Authentication
var jwtSecret = "your-super-secret-jwt-key-that-should-be-at-least-32-characters-long";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSecret)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200", "http://localhost:49354", "http://localhost:51697") // Angular dev server ports
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        });
});

// Register repositories and services
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IEmailService, EmailService>();

// Register DbContext with PostgreSQL database  
builder.Services.AddDbContext<StockManagementDBContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

// Log session configuration
var logger = app.Services.GetRequiredService<ILogger<Program>>();
var sessionTimeoutMinutes = app.Configuration.GetValue<int>("SessionTimeout:TimeoutMinutes", 30);
var sessionWarningMinutes = app.Configuration.GetValue<int>("SessionTimeout:WarningMinutes", 2);
logger.LogInformation("Session Configuration - Timeout: {TimeoutMinutes} minutes, Warning: {WarningMinutes} minutes", 
    sessionTimeoutMinutes, sessionWarningMinutes);

// Initialize the database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<StockManagementDBContext>();
    context.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS
app.UseCors("AllowAngularApp");

// Add session middleware
app.UseSession();

// Add custom session timeout middleware
app.UseMiddleware<SessionTimeoutMiddleware>();

// Remove HTTPS redirection for development
// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();