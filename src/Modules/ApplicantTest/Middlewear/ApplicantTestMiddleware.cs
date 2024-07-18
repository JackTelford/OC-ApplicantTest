/*using ApplicantTest.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using OrchardCore.ContentManagement;

namespace ApplicantTest.Middlewear;
public class ApplicantTestMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IContentManager _contentManager;

    public ApplicantTestMiddleware(RequestDelegate next, IContentManager contentManager)
    {
        _next = next;
        _contentManager = contentManager;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path == "/ApplicantTest/update-endpoint" && context.Request.Method == "POST")
        {
            using var reader = new StreamReader(context.Request.Body);
            var body = await reader.ReadToEndAsync();
            var request = JsonConvert.DeserializeObject<UpdateRequest>(body);

            var contentItem = await _contentManager.GetAsync(request.ContentItemId, VersionOptions.Latest);
            if (contentItem == null)
            {
                context.Response.StatusCode = 404;
                return;
            }

            var part = contentItem.As<ApplicantTestPart>();
            if (part != null)
            {
                switch (request.FieldName)
                {
                    case "EmailSent":
                    part.Email = request.Value;
                    break;
                    case "BookmarkClicked":
                    part.BookMarkClicked = request.Value;
                    break;
                    case "formSubmitted":
                    part.formSubmitted = request.Value;
                    break;
                    case "MessageSentToAsakoSatoshi":
                    part.MessageSentToAsakoSatoshi = request.Value;
                    break;
                    case "MessageSentToLilyWang":
                    part.MessageSentToLilyWang = request.Value;
                    break;
                    case "MessageSentToMadisonByers":
                    part.MessageSentToMadisonByers = request.Value;
                    break;
                    case "MessageSentToDominicGonzalez":
                    part.MessageSentToDominicGonzalez = request.Value;
                    break;
                    case "MessageSentToSimoneKhan":
                    part.MessageSentToSimoneKhan = request.Value;
                    break;
                }

                await _contentManager.UpdateAsync(contentItem);
            }

            context.Response.StatusCode = 200;
            await context.Response.WriteAsync("Success");
        }
        else
        {
            await _next(context);
        }
    }

    public class UpdateRequest
    {
        public string ContentItemId { get; set; }
        public string FieldName { get; set; }
        public int Value { get; set; }
    }
}

public static class ApplicantTestMiddlewareExtensions
{
    public static IApplicationBuilder UseApplicantTestMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ApplicantTestMiddleware>();
    }
}

// path /Middlewear/ApplicantTestMiddleware.cs
*/
