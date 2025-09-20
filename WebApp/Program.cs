using Todo.Repositories;
using Todo.Services;
using Todo.Services.Exceptions;
using Todo.Services.Mappings.Todo;
using Todo.Services.Validators;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options => { options.AddServerHeader = false; });

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.RegisterRepositories();

builder.Services.RegisterServices();

builder.Services.AddAutoMapper(config => { });

builder.Services.AddValidationsExtensions();

builder.Services.AddMemoryCache(options => { });

builder.Services.AddHttpContextAccessor();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

builder.Services.AddAutoMapper(expression => { expression.AddProfile<TodoProfile>(); });

var app = builder.Build();
app.UseExceptionHandler("/error");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();