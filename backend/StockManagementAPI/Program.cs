using Microsoft.EntityFrameworkCore;
using Stock_Management_Business.Interface;
using Stock_Management_Business.Service;
using Stock_Management_DataAccess.Interfaces;
using Stock_Management_DataAccess.Repositories;
using Stock_Management_DataAccess;
using Microsoft.Extensions.DependencyInjection;
using Stock_Management_Business.Mapper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register repositories and services
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
builder.Services.AddScoped<ICompanyService, CompanyService>();

// Register DbContext properly
builder.Services.AddDbContext<StockManagementDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();