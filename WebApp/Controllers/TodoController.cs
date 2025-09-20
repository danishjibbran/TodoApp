using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Todo.DataTransferObjects.Request;
using Todo.Services.Todos;

namespace Todo.WebApp.Controllers;

[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{
    private readonly ITodoService _todoService;
    private readonly IMapper _mapper;

    public TodoController(ITodoService todoService, IMapper mapper)
    {
        _todoService = todoService;
        _mapper = mapper;
    }

    [HttpPost("")]
    public async Task<object> Add([FromBody] TodoAddRequest request)
    {
        return await _todoService.Add(request);
    }

    [HttpPut("")]
    public async Task<object> Update([FromBody] TodoAddRequest request)
    {
        return await _todoService.Update(request);
    }

    [HttpDelete("{id:guid}")]
    public async Task<bool> Delete([FromRoute] Guid id)
    {
        return await _todoService.Delete(id);
    }

    [HttpGet("{id:guid}")]
    public async Task<DataTransferObjects.Todo> GetById([FromRoute] Guid id)
    {
        var todo = _mapper.Map<DataTransferObjects.Todo>(await _todoService.GetById(id));
        return todo;
    }

    [HttpGet]
    public async Task<List<DataTransferObjects.Todo>> Get()
    {
        var todos = _mapper.Map<List<DataTransferObjects.Todo>>(await _todoService.Get());
        return todos;
    }
}