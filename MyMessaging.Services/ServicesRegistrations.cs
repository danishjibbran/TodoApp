using Microsoft.Extensions.DependencyInjection;
using Todo.Services.Todos;

namespace Todo.Services;

public static class ServicesRegistrations
{
    public static void RegisterServices(this IServiceCollection services)
    {
        services.RegisterTodos();
    }
}