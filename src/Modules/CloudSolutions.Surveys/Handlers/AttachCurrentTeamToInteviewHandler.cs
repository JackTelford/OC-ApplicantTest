using System;
using System.Linq;
using System.Threading.Tasks;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Teams;
using CloudSolutions.Teams.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http;
using OrchardCore.ContentFields.Fields;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Handlers;

namespace CloudSolutions.Surveys.Handlers;

public sealed class AttachCurrentTeamToInteviewHandler : ContentHandlerBase
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IServiceProvider _serviceProvider;
    private ITeamStore _teamStore;

    public AttachCurrentTeamToInteviewHandler(IHttpContextAccessor httpContextAccessor,
        IServiceProvider serviceProvider)
    {
        _httpContextAccessor = httpContextAccessor;
        _serviceProvider = serviceProvider;
    }

    public override async Task ActivatedAsync(ActivatedContentContext context)
    {
        if (context.ContentItem.ContentType != SurveyConstants.InterviewContentType)
        {
            return;
        }

        // Lazy load ITeamStore to prevent circular reference since this class would be called from the ContentManager
        _teamStore ??= _serviceProvider.GetRequiredService<ITeamStore>();

        // attach the teamPart when the Interview content type is activated
        var userId = await _httpContextAccessor.HttpContext.UserIdAsync();
        var teams = await _teamStore.MemberOfAsync(userId);

        context.ContentItem.Alter<TeamPart>(part =>
        {
            part.Team = new ContentPickerField()
            {
                ContentItemIds = teams.Select(x => x.ContentItemId).ToArray(),
            };
        });
    }
}
