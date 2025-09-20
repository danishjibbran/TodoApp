using Todo.DataTransferObjects.Request;

namespace Todo.Services.Todos;

public interface ITodoService
{
    Task<bool> Add(TodoAddRequest request);
    Task<bool> Update(TodoAddRequest request);
    Task<bool> Delete(Guid id);
    Task<DomainObjects.Todo> GetById(Guid id);
    Task<List<DomainObjects.Todo>> Get();
}