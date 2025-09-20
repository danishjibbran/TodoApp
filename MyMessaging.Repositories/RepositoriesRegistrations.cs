using Microsoft.Extensions.DependencyInjection;
using Todo.Repositories.Repositories.Todos;

namespace Todo.Repositories;

public static class RepositoriesRegistrations
{
    public static void RegisterRepositories(this IServiceCollection services)
    {
        services.RegisterTodos();
    }
}