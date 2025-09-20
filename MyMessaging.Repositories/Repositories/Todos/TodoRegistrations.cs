using Microsoft.Extensions.DependencyInjection;

namespace Todo.Repositories.Repositories.Todos;

public static class TodoRegistrations
{
    public static void RegisterTodos(this IServiceCollection services)
    {
        services.AddSingleton<ITodoRepository, TodoRepository>();
    }
}