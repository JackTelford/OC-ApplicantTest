using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.Workflows.Activities;
using CloudSolutions.Teams;
using CloudSolutions.Teams.Models;
using CrestApps.Components;
using GraphQL;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.ContentManagement;
using OrchardCore.Users.Indexes;
using OrchardCore.Users.Models;
using OrchardCore.Workflows.Services;
using YesSql;

namespace CloudSolutions.Surveys.Handlers;

public sealed class NotifyCoachesWhenThresholdWasReached : IInterviewHandler
{
    private readonly ITeamStore _teamStore;
    private readonly ISession _session;
    private readonly ILogger _logger;
    private readonly IWorkflowManager _workflowManager;
    private readonly IDisplayNameProvider _displayNameProvider;

    internal readonly IStringLocalizer S;

    public NotifyCoachesWhenThresholdWasReached(ITeamStore teamStore,
        ISession session,
        IStringLocalizer<NotifyCoachesWhenThresholdWasReached> stringLocalizer,
        ILogger<NotifyCoachesWhenThresholdWasReached> logger,
        IWorkflowManager workflowManager,
        IDisplayNameProvider displayNameProvider)
    {
        _teamStore = teamStore;
        _session = session;
        S = stringLocalizer;
        _logger = logger;
        _workflowManager = workflowManager;
        _displayNameProvider = displayNameProvider;
    }

    public async Task CompletedAsync(ContentItem interview)
    {
        ArgumentNullException.ThrowIfNull(interview);

        var thresholdSummaries = interview.ThresholdSummaries();

        if (!thresholdSummaries.Any())
        {
            return;
        }

        var stepPart = interview.As<InterviewStepPart>();

        var owner = await _session.Query<User, UserIndex>(index => index.UserId == stepPart.IntervieweeId).FirstOrDefaultAsync();

        if (owner == null)
        {
            return;
        }

        var workflowInput = new Dictionary<string, object>();


        var teamIds = (interview.As<TeamPart>()?.Team?.ContentItemIds) ?? [];

        workflowInput.Add("TeamIds", teamIds);

        // Using 'User' key will allows NotifyUserTask to work
        workflowInput.Add("User", owner);

        // Using the 'ContentItem' key allows NotifyContentOwnerTask tasks to work.
        workflowInput.Add("ContentItem", interview);

        // Since we already know the owner, lets also set the owner so tasks like NotifyContentOwnerTask do not have to fetch it again
        workflowInput.Add("Owner", owner);

        workflowInput.Add("ThresholdSummaries", thresholdSummaries);

        workflowInput.Add("InterviewedAtUtc", stepPart.InterviewedAtUtc);

        if (_logger.IsEnabled(LogLevel.Information))
        {
            _logger.LogInformation("About to fire off WorkflowEvent '{Name}', TeamIds: {Total}, thresholdSummaries: {SummariesTotal}", nameof(InterviewBelowThresholdEvent), teamIds.Length, thresholdSummaries.Count());
        }

        await _workflowManager.TriggerEventAsync(nameof(InterviewBelowThresholdEvent), input: workflowInput, correlationId: interview.ContentItemId);
    }

    public Task CompletingAsync(ContentItem interview)
    {
        return Task.CompletedTask;
    }
}
