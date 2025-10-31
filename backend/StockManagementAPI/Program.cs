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

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register repositories and services
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

// Register DbContext with InMemory database for testing
builder.Services.AddDbContext<StockManagementDBContext>(options =>
    options.UseInMemoryDatabase("StockManagementDB"));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Configure JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"];

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ClockSkew = TimeSpan.Zero
    };
});

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "http://localhost:50190", "http://localhost:4201", "http://localhost:61814", "http://localhost:63892", "http://localhost:54850")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Seed the database with a default user
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<StockManagementDBContext>();
    var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();
    
    // Ensure the database is created
    context.Database.EnsureCreated();
    
    // Check if any users exist
    if (!context.Users.Any())
    {
        // Create a default admin user
        var defaultUser = new Stock_Management_DataAccess.Entities.UserEntity
        {
            Username = "admin",
            Email = "admin@example.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
            FirstName = "Admin",
            LastName = "User",
            CreatedDate = DateTime.UtcNow,
            IsActive = true
        };
        
        context.Users.Add(defaultUser);
        context.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Commented out for development - causing redirect issues
// app.UseHttpsRedirection();
app.UseCors("AllowAngularApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();