using Microsoft.Extensions.DependencyInjection;
using Todo.Services.Validators.Todos;

namespace Todo.Services.Validators;

public static class ValidationsExtensions
{
    public static void AddValidationsExtensions(this IServiceCollection services)
    {
        services.RegisterTodoValidators();
    }
}