
namespace Todo.Repositories.Repositories.Todos;

public interface ITodoRepository
{
    public Task<bool> Add(DomainObjects.Todo todo);
    public Task<bool> Update(DomainObjects.Todo todo);
    public Task<bool> Delete(Guid id);
    public Task<DomainObjects.Todo> GetById(Guid id);
    public Task<List<DomainObjects.Todo>> Get();
}