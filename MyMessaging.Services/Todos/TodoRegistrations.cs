using Microsoft.Extensions.DependencyInjection;

namespace Todo.Services.Todos;

public static class TodoRegistrations
{
    public static void RegisterTodos(this IServiceCollection services)
    {
        services.AddSingleton<ITodoService, TodoService>();
    }
}