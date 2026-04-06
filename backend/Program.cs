using Microsoft.EntityFrameworkCore;
using FluentBee.Api.Data;
using FluentBee.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        opts.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });
builder.Services.AddOpenApi();

// Add Database Context
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=fluentbee.db";

if (connectionString.Contains("Server=") || connectionString.Contains("Database=") || connectionString.Contains("database.windows.net"))
{
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(connectionString));
}
else
{
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlite(connectionString));
}

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddHttpClient<GeminiAiService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    // Run Seeder
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<FluentBee.Api.Data.ApplicationDbContext>();
        context.Database.EnsureCreated(); // Migration for Render / Production
        FluentBee.Api.Data.DbSeeder.Seed(context);
    }
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

// Run Seeder in all environments
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<FluentBee.Api.Data.ApplicationDbContext>();
    context.Database.EnsureCreated(); // Migration for Render / Production
    FluentBee.Api.Data.DbSeeder.Seed(context);
}

app.UseAuthorization();

app.MapControllers();

app.Run();
