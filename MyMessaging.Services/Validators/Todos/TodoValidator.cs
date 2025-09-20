using FluentValidation;

namespace Todo.Services.Validators.Todos;

public class TodoValidator : AbstractValidator<DataTransferObjects.Todo>
{
    public TodoValidator()
    {
        RuleFor(t => t.Name).NotEmpty();
        RuleFor(t => t.Description).NotEmpty();
        RuleFor(t => t.Id).NotEmpty();
        RuleFor(t => t.Id).Must(id => id != Guid.Empty);
    }
}