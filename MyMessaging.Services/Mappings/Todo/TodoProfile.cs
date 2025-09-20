using AutoMapper;

namespace Todo.Services.Mappings.Todo;

public class TodoProfile : Profile
{
    public TodoProfile()
    {
        CreateMap<DomainObjects.Todo, DataTransferObjects.Todo>()
            .ReverseMap();
    }
}