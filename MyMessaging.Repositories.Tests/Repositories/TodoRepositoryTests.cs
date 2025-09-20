using NSubstitute;
using Todo.DataTransferObjects.Request;
using Todo.Repositories.Repositories.Todos;
using Xunit;

namespace Todo.Repositories.Tests.Repositories;

public class TodoRepositoryTests
{
    [Fact]
    async Task it_should_add_todo()
    {
        var todoRepository = new TodoRepository();
        var result = await todoRepository.Add(
            new DomainObjects.Todo()
            {
                Id = Guid.NewGuid(),
                Name = "test",
                Description = "test"
            }
        );

        var todos = await todoRepository.Get();

        Assert.True(result);
        Assert.Equal(1, todos.Count);
    }

    [Fact]
    async Task it_should_update_todo()
    {
        var id = Guid.NewGuid();
        var todoRepository = new TodoRepository();
        var result = await todoRepository.Add(
            new DomainObjects.Todo()
            {
                Id = id,
                Name = "test",
                Description = "test"
            }
        );

        var todo = await todoRepository.GetById(id);
        Assert.Equal("test", todo.Name);
        todo.Name = "test2";
        await todoRepository.Update(todo);

        todo = await todoRepository.GetById(id);

        Assert.Equal("test2", todo.Name);
    }

    [Fact]
    async Task it_should_delete_todo()
    {
        var todoRepository = new TodoRepository();
        var id = Guid.NewGuid();
        var result = await todoRepository.Add(new DomainObjects.Todo()
            {
                Id = id,
                Name = "test",
                Description = "test"
            }
        );

        var todos = await todoRepository.Get();

        Assert.True(result);
        Assert.Equal(1, todos.Count);

        await todoRepository.Delete(id);

        todos = await todoRepository.Get();
        Assert.Equal(0, todos.Count);
    }
}