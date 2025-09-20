using AutoMapper;
using FluentValidation;
using Todo.DataTransferObjects.Request;
using Todo.Repositories.Repositories.Todos;

namespace Todo.Services.Todos;

public class TodoService : ITodoService
{
    private readonly ITodoRepository _todoRepository;
    private readonly IMapper _mapper;
    private readonly IValidator<DataTransferObjects.Todo> _todoValidator;

    public TodoService(ITodoRepository todoRepository, IMapper mapper, IValidator<DataTransferObjects.Todo> todoValidator)
    {
        _todoRepository = todoRepository;
        _mapper = mapper;
        _todoValidator = todoValidator;
    }

    public async Task<bool> Add(TodoAddRequest request)
    {
        await _todoValidator.ValidateAndThrowAsync(request.Todo);
        var todo = _mapper.Map<DomainObjects.Todo>(request.Todo);
        return await _todoRepository.Add(todo);
    }

    public async Task<bool> Update(TodoAddRequest request)
    {
        await _todoValidator.ValidateAndThrowAsync(request.Todo);
        var todo = _mapper.Map<DomainObjects.Todo>(request.Todo);
        return await _todoRepository.Update(todo);
    }

    public async Task<bool> Delete(Guid id)
    {
        return await _todoRepository.Delete(id);
    }

    public async Task<DomainObjects.Todo> GetById(Guid id)
    {
        return await _todoRepository.GetById(id);
    }

    public async Task<List<DomainObjects.Todo>> Get()
    {
        return await _todoRepository.Get();
    }
}