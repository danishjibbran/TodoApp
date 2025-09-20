using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;

namespace Todo.Services.Exceptions;

public class GlobalExceptionHandler : IExceptionHandler
{
    public GlobalExceptionHandler()
    {
    }

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        httpContext.Response.StatusCode = (int) HttpStatusCode.BadRequest;
        var jsonResponse = new
        {
            Message = exception.Message,
            StackTrace =  exception.StackTrace
        };

        await httpContext.Response.WriteAsJsonAsync(jsonResponse, typeof(object), new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        }, cancellationToken);
        return await Task.FromResult(true);
    }
}