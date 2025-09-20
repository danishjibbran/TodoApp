using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Todo.Services.Validators.Todos;

public static class TodoValidatorRegistrations
{
    public static void RegisterTodoValidators(this IServiceCollection services)
    {
        services.AddTransient<IValidator<DataTransferObjects.Todo>, TodoValidator>();
    }
}