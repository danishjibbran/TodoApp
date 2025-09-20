using AutoMapper;
using NSubstitute;
using Todo.DataTransferObjects.Request;
using Todo.Services.Mappings.Todo;
using Todo.Services.Todos;
using Todo.WebApp.Controllers;
using Xunit;

namespace Todo.WebAppTests.Controllers;

public class TodoControllerTests
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
        var todoService = Substitute.For<ITodoService>();
        todoService.Add(Arg.Is<TodoAddRequest>(request => request.Todo.Name == "test")).Returns(Task.FromResult(true));
        var autoMapper = GetAutoMapperConfiguration();
        var todoController = new TodoController(todoService, autoMapper);

        var result = await todoController.Add(new TodoAddRequest()
        {
            Todo = new DataTransferObjects.Todo()
            {
                Id = Guid.NewGuid(),
                Name = "test",
                Description = "test"
            }
        });

        await todoService.Received(1).Add(Arg.Is<TodoAddRequest>(request => request.Todo.Name == "test"));
    }

    [Fact]
    public async Task it_should_edit_todo()
    {
        var todoService = Substitute.For<ITodoService>();
        todoService.Add(Arg.Is<TodoAddRequest>(request => request.Todo.Name == "test")).Returns(Task.FromResult(true));
        var autoMapper = GetAutoMapperConfiguration();
        var todoController = new TodoController(todoService, autoMapper);

        var result = await todoController.Update(new TodoAddRequest()
        {
            Todo = new DataTransferObjects.Todo()
            {
                Id = Guid.NewGuid(),
                Name = "test",
                Description = "test"
            }
        });

        await todoService.Received(1).Update(Arg.Is<TodoAddRequest>(request => request.Todo.Name == "test"));
    }

    [Fact]
    public async Task it_should_delete_todo()
    {
        var todoService = Substitute.For<ITodoService>();
        var id = Guid.NewGuid();
        todoService.Delete(id).Returns(Task.FromResult(true));
        var autoMapper = GetAutoMapperConfiguration();
        var todoController = new TodoController(todoService, autoMapper);
        var result = await todoController.Delete(id);

        await todoService.Received(1).Delete(id);
    }
}