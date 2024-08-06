using CloudSolutions.ContentRestrictions;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Indexes;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.ViewModels;
using CloudSolutions.Teams.Indexes;
using CloudSolutions.Teams.Models;
using CrestApps.Components;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.ContentManagement;
using OrchardCore.Modules;
using OrchardCore.Users.Indexes;
using OrchardCore.Users.Models;
using YesSql;
using YesSql.Services;

namespace CloudSolutions.Surveys.Services;

public sealed class InterviewsDataReportProvider
{
    private readonly IStore _store;
    private readonly ILocalClock _clock;
    private readonly IDisplayNameProvider _displayNameProvider;
    private readonly ILogger _logger;
    private readonly IAccessibleUserService _accessibleUserService;
    private readonly IInterviewDataPresenter _interviewDataPresenter;

    internal readonly IStringLocalizer S;

    public InterviewsDataReportProvider(IStore store,
        ILocalClock clock,
        IDisplayNameProvider displayNameProvider,
        ILogger<InterviewsDataReportProvider> logger,
        IAccessibleUserService accessibleUserService,
        IStringLocalizer<InterviewsDataReportProvider> stringLocalizer,
        IInterviewDataPresenter interviewDataPresenter)
    {
        _store = store;
        _clock = clock;
        _displayNameProvider = displayNameProvider;
        _logger = logger;
        _accessibleUserService = accessibleUserService;
        S = stringLocalizer;
        _interviewDataPresenter = interviewDataPresenter;
    }

    public async Task PopulateAsync(InterviewsDataViewModel model, bool includeUsers = false, bool includeTeams = false)
    {
        model.Columns.Clear();
        model.Columns.AddRange(await _interviewDataPresenter.GetReportColumnsAsync(model.Survey));

        var readonlySession = _store.CreateSession(withTracking: false);

        var query = readonlySession.Query<ContentItem>();

        if (await _accessibleUserService.RestrictContentAsync())
        {
            // At this point we are using content restrictions.
            // lets enforce it.
            var accessibleUserIds = await _accessibleUserService.UserIdsAsync();

            query.With<InterviewIndex>(x => x.IntervieweeId == null || x.IntervieweeId.IsIn(accessibleUserIds));
        }

        _logger.LogInformation("Executing interviews query with '{Count}' conditions", model.Conditions.Count);

        var interviews = await query.All(model.Conditions.ToArray()).ListAsync();

        var records = new List<InterviewRecord>();
        var userIds = new List<string>();
        var teamIds = new List<string>();

        foreach (var interview in interviews)
        {
            var record = new InterviewRecord()
            {
                ContentItem = interview,
                UserId = interview.Owner,
                TeamIds = [],
                TeamNames = [],
            };

            if (includeUsers && !string.IsNullOrEmpty(interview.Owner))
            {
                userIds.Add(interview.Owner);
            }

            if (interview.Has<TeamPart>())
            {
                // At this point we know TeamPart is attached so we should be cast to it
                var teamPart = interview.As<TeamPart>();

                if (teamPart != null && teamPart.Team != null && teamPart.Team.ContentItemIds != null)
                {
                    foreach (var teamId in teamPart.Team.ContentItemIds)
                    {
                        record.TeamIds.Add(teamId);

                        if (includeTeams)
                        {
                            teamIds.Add(teamId);
                        }
                    }
                }
            }

            var stepPart = interview.As<InterviewStepPart>();

            if (stepPart != null)
            {
                record.InterviewId = stepPart.IntervieweeId;
                record.InterviewedAtUtc = stepPart.InterviewedAtUtc;
                record.InterviewedAtLocal = (await _clock.ConvertToLocalAsync(stepPart.InterviewedAtUtc)).DateTime;
            }

            records.Add(record);
        }

        if (includeUsers && userIds.Count > 0)
        {
            var distinctUserIds = userIds.Distinct().ToList();

            model.Users = (await readonlySession.Query<User, UserIndex>(x => x.UserId.IsIn(distinctUserIds)).ListAsync())
                .ToDictionary(x => x.UserId);
        }

        if (includeTeams && teamIds.Count > 0)
        {
            var distinctTeamIds = teamIds.Distinct().ToList();
            model.Teams = (await readonlySession.Query<ContentItem, TeamIndex>(x => x.ContentItemId.IsIn(distinctTeamIds)).ListAsync())
                .ToDictionary(x => x.ContentItemId);
        }

        if (includeUsers || includeTeams)
        {
            foreach (var record in records)
            {
                if (includeUsers)
                {
                    if (record.UserId != null && model.Users.TryGetValue(record.UserId, out var user))
                    {
                        record.FullName = await _displayNameProvider.GetAsync(user);
                    }
                    else
                    {
                        record.FullName = S["Anonymous"];
                    }
                }

                if (includeTeams)
                {
                    foreach (var teamId in record.TeamIds)
                    {
                        if (model.Teams.TryGetValue(teamId, out var team))
                        {
                            record.TeamNames.Add(team.DisplayText);
                        }
                    }
                }
            }
        }

        model.Interviews = records;
    }
}
