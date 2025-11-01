using Microsoft.EntityFrameworkCore;
using Stock_Management_Business.Interface;
using Stock_Management_Business.Service;
using Stock_Management_DataAccess.Interfaces;
using Stock_Management_DataAccess.Repositories;
using Stock_Management_DataAccess;
using Microsoft.Extensions.DependencyInjection;
using Stock_Management_Business.Mapper;

var builder = WebApplication.CreateBuilder(args);

// Configure URLs
builder.WebHost.UseUrls("http://localhost:5134");

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

// Register DbContext with SQLite database  
builder.Services.AddDbContext<StockManagementDBContext>(options =>
    options.UseSqlite("Data Source=stockmanagement.db"));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

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

// Remove HTTPS redirection for development
// app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();