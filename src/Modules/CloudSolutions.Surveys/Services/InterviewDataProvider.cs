using CloudSolutions.Charts.Models;
using CloudSolutions.Charts.ViewModels;
using CloudSolutions.General;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Indexes;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.ViewModels;
using CloudSolutions.Teams;
using CrestApps.Support;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Http;
using Microsoft.Extensions.Logging;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display;
using OrchardCore.ContentManagement.Records;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.Modules;
using OrchardCore.Settings;
using YesSql;
using YesSql.Services;

namespace CloudSolutions.Surveys.Services;

public sealed class InterviewDataProvider
{
    private readonly ITeamStore _teamStore;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly YesSql.ISession _session;
    private readonly ILogger _logger;
    private readonly ILocalClock _clock;
    private readonly IContentItemDisplayManager _displayManager;
    private readonly IUpdateModelAccessor _updateModelAccessor;
    private readonly IInterviewDataPresenter _interviewDataPresenter;
    private readonly ISiteService _siteService;

    public InterviewDataProvider(ITeamStore teamStore,
        IHttpContextAccessor httpContextAccessor,
        YesSql.ISession session,
        ILogger<InterviewDataProvider> logger,
        ILocalClock clock,
        IContentItemDisplayManager displayManager,
        IUpdateModelAccessor updateModelAccessor,
        IInterviewDataPresenter interviewDataPresenter,
        ISiteService siteService)
    {
        _teamStore = teamStore;
        _httpContextAccessor = httpContextAccessor;
        _session = session;
        _logger = logger;
        _clock = clock;
        _displayManager = displayManager;
        _updateModelAccessor = updateModelAccessor;
        _interviewDataPresenter = interviewDataPresenter;
        _siteService = siteService;
    }

    public async Task<ChartViewModel> GetAsync(string surveyVersionId, IEnumerable<string> inputIds, IEnumerable<string> teamIds, DateTime interviewedFrom, DateTime interviewedTo, string title, bool dataForLoggedUserOnly)
    {
        var survey = await _session.Query<ContentItem, ContentItemIndex>(x => x.ContentItemVersionId == surveyVersionId && x.ContentType == SurveyConstants.SurveyContentType).FirstOrDefaultAsync();

        if (survey == null)
        {
            _logger.LogWarning("Unable to find survey with the version Id of {versionId}", surveyVersionId);

            return null;
        }

        return await GetAsync(survey, inputIds, teamIds, interviewedFrom, interviewedTo, title, dataForLoggedUserOnly);
    }


    public async Task<ChartViewModel> GetAsync(ContentItem survey, IEnumerable<string> inputIds, IEnumerable<string> teamIds, DateTime interviewedFrom, DateTime interviewedTo, string title, bool dataForLoggedUserOnly)
    {
        ArgumentNullException.ThrowIfNull(survey, nameof(survey));

        if (survey.ContentType != SurveyConstants.SurveyContentType)
        {
            _logger.LogWarning("The provided contentItem must be of type '{Survey}'. The given type is {ContentType}", SurveyConstants.SurveyContentType, survey.ContentType);

            return null;
        }


        if (inputIds == null || !inputIds.Any())
        {
            _logger.LogWarning("No inputIds were provided to the {Name} service to generate a chart", nameof(InterviewDataPresenter));
            return null;
        }

        var accessibleTeamIds = await _teamStore.AccessibleTeamIdsAsync(await _httpContextAccessor.HttpContext.UserIdAsync());
        var interviews = await GetInterviewDataAsync(survey.ContentItemVersionId, teamIds, interviewedFrom, interviewedTo, dataForLoggedUserOnly, accessibleTeamIds);

        var table = await _interviewDataPresenter.GetTableAsync(survey, interviews);
        var datOfWeek = await _siteService.GetSiteDayOfWeekAsync();
        var data = table.Rows.Select(x => new
        {
            DateOf = x.InterviewAtLocal.Date.StartOfWeek(datOfWeek),
            x.Cells,
        }).GroupBy(x => x.DateOf)
          .Select(x => new
          {
              WeekOf = x.Key,
              Averages = x.SelectMany(y => y.Cells.Where(y => inputIds.Contains(y.InputId)))
                    .GroupBy(y => y.InputId)
                    .Select(y => new
                    {
                        InputId = y.Key,
                        Average = y.Where(z => z.Average != null).Average(z => z.Average)
                    })

          }).ToList();

        var viewModel = new ChartViewModel
        {
            Type = "bar",
            AdditionalData = new Dictionary<string, object>()
            {
                { "surveyVersionId", survey.ContentItemVersionId },
            },
            Responsive = false,
            MaintainAspectRatio = true,
            Data = new ChartDataViewModel
            {
                Labels = []
            },

            Options = new ChartOptionViewModel()
            {
                Plugins = new ChartPluginsViewModel()
                {
                    Legend = new LegendPluginOptions(),
                    Title = new TitlePluginOptions()
                    {
                        Display = true,
                        Text = title
                    }
                }
            }
        };

        var colorIndex = 0;

        foreach (var r in data)
        {
            var dataLabel = r.WeekOf.ToShortDateString();

            viewModel.Data.Labels.Add(dataLabel);

            foreach (var avg in r.Averages)
            {
                var header = table.Columns.FirstOrDefault(x => x.InputId == avg.InputId);

                if (header == null)
                {
                    continue;
                }

                var dataSetLabel = header.Title;

                var dataset = viewModel.Data.Datasets.FirstOrDefault(x => x.Label == dataSetLabel);

                if (dataset == null)
                {
                    dataset = new ChartDataSetViewModel()
                    {
                        Label = dataSetLabel,
                        BackgroundColor = [ChartViewModel.DefaultColors[colorIndex++]],
                        BorderWidth = 0,
                    };

                    viewModel.Data.Datasets.Add(dataset);
                }

                var point = new ChartPointViewModel(dataLabel, avg.Average);

                dataset.Data.Add(point);
            }
        }

        return viewModel;
    }

    private async Task<IEnumerable<ContentItem>> GetInterviewDataAsync(string versionId, IEnumerable<string> teamIds, DateTime interviewedFrom, DateTime interviewedTo, bool dataForLoggedUserOnly, IEnumerable<string> accessibleTeamIds)
    {
        if (dataForLoggedUserOnly)
        {
            var userId = await _httpContextAccessor.HttpContext.UserIdAsync();

            return await _session.Query<ContentItem, InterviewIndex>(x => x.SurveyVersionId == versionId && x.Status == SurveyConstants.Completed && x.IntervieweeId == userId && x.InterviewedAt >= interviewedFrom && x.InterviewedAt <= interviewedTo)
                                  .OrderBy(x => x.InterviewedAt)
                                  .ListAsync();
        }

        var teamIdsFilter = GetTeamIds(teamIds, accessibleTeamIds);

        return await _session.Query<ContentItem, InterviewIndex>(x => x.SurveyVersionId == versionId && x.Status == SurveyConstants.Completed && x.InterviewedAt >= interviewedFrom && x.InterviewedAt <= interviewedTo)
                             .OrderBy(x => x.InterviewedAt)
                             .With<InterviewTeamIndex>(x => x.TeamId.IsIn(teamIdsFilter))
                             .ListAsync();

    }

    private static IEnumerable<string> GetTeamIds(IEnumerable<string> teamIds, IEnumerable<string> accessibleTeamIds)
    {
        var teamIdsFilter = accessibleTeamIds;

        if (teamIds != null && teamIds.Any())
        {
            teamIdsFilter = accessibleTeamIds.Intersect(teamIds);
        }

        return teamIdsFilter;
    }

    public async Task<ChartViewModel> GetAsync(InterviewDataWithDefinedRangePart part, ChartInfoPart chartInfoPart, string[] teamIds = null)
    {
        ArgumentNullException.ThrowIfNull(part, nameof(part));
        ArgumentNullException.ThrowIfNull(chartInfoPart, nameof(chartInfoPart));

        var title = chartInfoPart?.Title?.Text;

        if (string.IsNullOrWhiteSpace(title))
        {
            title = part.ContentItem.DisplayText;
        }

        var combinedTeamIds = await GetTeamIdsAsync(part, teamIds);

        var from = await GetFromDateAsync(part.Range);
        var to = (await _clock.LocalNowAsync).DateTime;

        var dataForLoggedUserOnly = false;

        if (part.DataSource == "logged-user")
        {
            dataForLoggedUserOnly = true;
        }

        return await GetAsync(part.SurveyVersionId, part.InputIds, combinedTeamIds, from, to, title, dataForLoggedUserOnly);
    }

    private async Task<string[]> GetTeamIdsAsync(InterviewDataWithDefinedRangePart part, string[] teamIds)
    {
        var teamIdsToUse = Enumerable.Empty<string>();

        if (InterviewDataWithDefinedRangePartViewModel.IsSpecificTeams(part.DataSource))
        {
            teamIdsToUse = part.TeamIds ?? [];
        }
        else if (part.DataSource == "logged-user-current-team")
        {
            var currentUserId = await _httpContextAccessor.HttpContext.UserIdAsync();

            var teams = await _teamStore.MemberOfAsync(currentUserId);
            teamIdsToUse = teams.Select(x => x.ContentItemId).ToArray();
        }
        else
        {
            teamIdsToUse = await _teamStore.AccessibleTeamIdsAsync(await _httpContextAccessor.HttpContext.UserIdAsync());
        }

        if (teamIds != null && teamIds.Length > 0)
        {
            return teamIdsToUse.Intersect(teamIds).ToArray();
        }

        return [];
    }

    private async Task<DateTime> GetFromDateAsync(string range)
    {
        var now = await _clock.LocalNowAsync;
        var dayOfWeek = await _siteService.GetSiteDayOfWeekAsync();

        // default to the begin of the week
        var currentWeek = now.DateTime.StartOfWeek(dayOfWeek);

        if (range != null && int.TryParse(range.Replace("-weeks", string.Empty), out var weeks) && weeks > 0)
        {
            return currentWeek.AddDays(weeks * -7); // 2 * -7 would be 14 days ago
        }

        return currentWeek;
    }
}
