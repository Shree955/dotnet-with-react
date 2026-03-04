using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Core; 
using ActivityApp.Activities1.Commands;
using FluentValidation;
using Application.Activities.Validators;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

// MediatR
builder.Services.AddMediatR(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddTransient(
    typeof(IPipelineBehavior<,>),
    typeof(ValidationBehavior<,>));

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfiles));

// ✅ FluentValidation registration (THIS WAS MISSING)
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();

// DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration
        .GetConnectionString("DefaultConnection"));
});

// CORS
builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleware>();


var app = builder.Build();

// Enable CORS
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(x => x.AllowAnyHeader()
                  .AllowAnyMethod()
                  .WithOrigins("http://localhost:3000",
                               "https://localhost:3000"));

// Map controllers
app.MapControllers();

// Seed database
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();