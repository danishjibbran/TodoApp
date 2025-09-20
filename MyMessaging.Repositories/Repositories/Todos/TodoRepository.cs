
namespace Todo.Repositories.Repositories.Todos;

public class TodoRepository : ITodoRepository
{
    private List<DomainObjects.Todo> _todos = new List<DomainObjects.Todo>();

    public TodoRepository()
    {
    }

    public Task<bool> Add(DomainObjects.Todo todo)
    {
        _todos.Add(todo);
        return Task.FromResult(true);
    }

    public Task<bool> Update(DomainObjects.Todo todo)
    {
        var existingTodo = _todos.First(todo1 => todo1.Id == todo.Id);
        existingTodo.Description = todo.Description;
        existingTodo.Name = todo.Name;
        return Task.FromResult(true);
    }

    public Task<bool> Delete(Guid id)
    {
        _todos = _todos.Where(x => x.Id != id).ToList();
        return Task.FromResult(true);
    }

    public async Task<DomainObjects.Todo> GetById(Guid id)
    {
        return await Task.FromResult(_todos.First(x => x.Id == id));
    }

    public Task<List<DomainObjects.Todo>> Get()
    {
        return Task.FromResult(_todos);
    }
}