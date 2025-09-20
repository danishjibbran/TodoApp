using AutoMapper;
using NSubstitute;
using Todo.DataTransferObjects.Request;
using Todo.Repositories.Repositories.Todos;
using Todo.Services.Mappings.Todo;
using Todo.Services.Todos;
using Todo.Services.Validators.Todos;
using Xunit;

namespace Todo.Services.Tests;

public class TodoServiceTests
{
    private IMapper GetAutoMapperConfiguration()
    {
        var autoMapperConfiguration = new MapperConfiguration(expression => { expression.AddProfile<TodoProfile>(); });
        var autoMapper = autoMapperConfiguration.CreateMapper();
        return autoMapper;
    }

    [Fact]
    public async Task it_should_add_todo()
    {
        var todoRepository = Substitute.For<ITodoRepository>();
        todoRepository.Add(Arg.Is<DomainObjects.Todo>(todo => todo.Name == "test")).Returns(Task.FromResult(true));
        var autoMapper = GetAutoMapperConfiguration();
        var todoService = new TodoService(todoRepository, autoMapper, new TodoValidator());

        var result = await todoService.Add(new TodoAddRequest()
        {
            Todo = new DataTransferObjects.Todo()
            {
                Id = Guid.NewGuid(),
                Name = "test",
                Description = "test"
            }
        });

        await todoRepository.Received(1).Add(Arg.Is<DomainObjects.Todo>(request => request.Name == "test"));
    }

    [Fact]
    public async Task it_should_throw_error_when_name_is_null()
    {
        var todoRepository = Substitute.For<ITodoRepository>();
        var autoMapper = GetAutoMapperConfiguration();
        var todoService = new TodoService(todoRepository, autoMapper, new TodoValidator());

        await Assert.ThrowsAnyAsync<Exception>(async () =>
        {
            var result = await todoService.Add(new TodoAddRequest()
            {
                Todo = new DataTransferObjects.Todo()
                {
                    Id = Guid.NewGuid(),
                    Name = "",
                    Description = "test"
                }
            });
        });
    }

    [Fact]
    public async Task it_should_edit_todo()
    {
        var todoRepository = Substitute.For<ITodoRepository>();
        todoRepository.Update(Arg.Is<DomainObjects.Todo>(request => request.Name == "test")).Returns(Task.FromResult(true));
        var autoMapper = GetAutoMapperConfiguration();
        var todoService = new TodoService(todoRepository, autoMapper, new TodoValidator());

        var result = await todoService.Update(new TodoAddRequest()
        {
            Todo = new DataTransferObjects.Todo()
            {
                Id = Guid.NewGuid(),
                Name = "test",
                Description = "test"
            }
        });

        await todoRepository.Received(1).Update(Arg.Is<DomainObjects.Todo>(request => request.Name == "test"));
    }

    [Fact]
    public async Task it_should_delete_todo()
    {
        var todoRepository = Substitute.For<ITodoRepository>();
        var id = Guid.NewGuid();
        todoRepository.Delete(id).Returns(Task.FromResult(true));
        var autoMapper = GetAutoMapperConfiguration();
        var todoService = new TodoService(todoRepository, autoMapper, new TodoValidator());

        var result = await todoService.Delete(id);

        await todoRepository.Received(1).Delete(id);
    }
}