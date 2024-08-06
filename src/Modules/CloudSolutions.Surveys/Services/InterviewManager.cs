using CloudSolutions.General;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Indexes;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.Models;
using CloudSolutions.Surveys.ViewModels;
using CrestApps.Support;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Http;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display;
using OrchardCore.ContentManagement.Records;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.Entities;
using OrchardCore.Flows.Models;
using OrchardCore.Modules;
using OrchardCore.Settings;
using YesSql;

namespace CloudSolutions.Surveys.Services;

public sealed class InterviewManager : IInterviewManager
{
    private readonly YesSql.ISession _session;
    private readonly IUpdateModelAccessor _updateModelAccessor;
    private readonly ILogger _logger;
    private readonly IContentItemDisplayManager _contentItemDisplayManager;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IClock _clock;
    private readonly ILocalClock _localClock;
    private readonly ISiteService _siteService;
    private readonly IEnumerable<IInterviewHandler> _interviewEvents;
    private readonly IContentManager _contentManager;

    internal readonly IStringLocalizer S;

    public InterviewManager(YesSql.ISession session,
        IUpdateModelAccessor updateModelAccessor,
        ILogger<InterviewManager> logger,
        IStringLocalizer<InterviewManager> s,
        IContentItemDisplayManager contentItemDisplayManager,
        IHttpContextAccessor httpContextAccessor,
        IClock clock,
        ILocalClock localClock,
        ISiteService siteService,
        IEnumerable<IInterviewHandler> interviewEvents,
        IContentManager contentManager)
    {
        _session = session;
        _updateModelAccessor = updateModelAccessor;
        _logger = logger;
        S = s;
        _contentItemDisplayManager = contentItemDisplayManager;
        _httpContextAccessor = httpContextAccessor;
        _clock = clock;
        _localClock = localClock;
        _siteService = siteService;
        _interviewEvents = interviewEvents;
        _contentManager = contentManager;
    }

    public async Task<InterviewResult> StartAsync(string surveyId)
    {
        ArgumentNullException.ThrowIfNull(surveyId, nameof(surveyId));

        // TODO, store surveys in an index and query by SurveyIndex
        var contentItem = await _session.Query<ContentItem, ContentItemIndex>(x => x.ContentItemId == surveyId && x.ContentType == SurveyConstants.SurveyContentType && x.Published).FirstOrDefaultAsync();

        if (contentItem == null)
        {
            return null;
        }

        return await StartAsync(contentItem);
    }

    public async Task<CanStartResult> CanStartAsync(ContentItem interview, string userId)
    {
        if (await ReachedDailyLimits(interview, userId))
        {
            return CanStartResult.Fail(S["Unable to start an interview! The maximum allowed interviews for today was reached."]);
        }

        if (await ReachedWeeklyLimits(interview, userId))
        {
            return CanStartResult.Fail(S["Unable to start an interview! The maximum allowed interviews for this week was reached."]);
        }

        return await CanStartAtThisTime(interview) ?? CanStartResult.Success;
    }

    private async Task<CanStartResult> CanStartAtThisTime(ContentItem survey)
    {
        // The restrictionPart should be part of InterviewValidator class to allow for extensions

        var restrictionPart = survey.As<SurveyRestrictionPart>();

        if (restrictionPart?.EnableDailyRestriction == false)
        {
            return null;
        }

        var nowLocal = await _localClock.LocalNowAsync;

        if (restrictionPart.DailyRestrictions.TryGetValue(nowLocal.DayOfWeek, out var dailyRestrictions))
        {
            if (dailyRestrictions.Type == DailyRestrictionType.PreventAll)
            {
                return CanStartResult.Fail(S["Interviews for today are not allowed to be concluded."]);
            }

            if (dailyRestrictions.Type == DailyRestrictionType.LimitTime
                && (nowLocal.TimeOfDay < dailyRestrictions.From || nowLocal.TimeOfDay > dailyRestrictions.To))
            {
                return CanStartResult.Fail(S["Interviews at this time of the day are not allowed to be concluded."]);
            }
        }

        return null;
    }

    private async Task<bool> ReachedDailyLimits(ContentItem survey, string userId)
    {
        // The restrictionPart should be part of InterviewValidator class to allow for extensions

        var restrictionPart = survey.As<SurveyRestrictionPart>();

        if (!restrictionPart?.EnableDailyLimit?.Value ?? false || restrictionPart?.MaxDailyAllowed?.Value == null)
        {
            return false;
        }

        var nowLocal = await _localClock.LocalNowAsync;

        var startAtUtc = await _localClock.ConvertToUtcAsync(nowLocal.DateTime.Date);
        var endAtUtc = startAtUtc.AddDays(1).AddSeconds(-1);

        var count = await TotalCompletedAsync(survey.ContentItemId, userId, startAtUtc, endAtUtc);

        if (count >= restrictionPart.MaxDailyAllowed.Value)
        {
            return true;
        }

        return false;
    }

    private async Task<bool> ReachedWeeklyLimits(ContentItem survey, string userId)
    {
        // The restrictionPart should be part of InterviewValidator class to allow for extensions

        var restrictionPart = survey.As<SurveyRestrictionPart>();

        if (!restrictionPart?.EnableWeeklyLimit?.Value ?? false || restrictionPart?.MaxWeeklyAllowed?.Value == null)
        {
            return false;
        }

        var nowLocal = await _localClock.LocalNowAsync;

        if (restrictionPart.EnableWeeklyLimit != null && restrictionPart.EnableWeeklyLimit.Value && restrictionPart.MaxWeeklyAllowed != null && restrictionPart.MaxWeeklyAllowed.Value.HasValue)
        {
            var dayOfWeek = await _siteService.GetSiteDayOfWeekAsync();
            var startAtLocal = nowLocal.DateTime.StartOfWeek(dayOfWeek);
            var startAtUtc = await _localClock.ConvertToUtcAsync(startAtLocal);
            var endAtUtc = startAtUtc.AddDays(7).AddSeconds(-1);

            var count = await TotalCompletedAsync(survey.ContentItemId, userId, startAtUtc, endAtUtc);

            if (count >= restrictionPart.MaxWeeklyAllowed.Value)
            {
                return true;
            }
        }

        return false;
    }

    public async Task<InterviewResult> StartAsync(ContentItem survey)
    {
        ArgumentNullException.ThrowIfNull(survey, nameof(survey));

        // get the first page
        // TODO, rename the bag part to "Pages";
        var pageBagPart = survey.Get<BagPart>(SurveyConstants.Pages);

        if (pageBagPart == null || pageBagPart.ContentItems == null || pageBagPart.ContentItems.Count == 0)
        {
            _logger.LogError("Unable to get the BagPart from the Survey content Item to determine the survey page. This most likely to incomplete survey");

            _updateModelAccessor.ModelUpdater.ModelState.AddModelError(string.Empty, S["Unable to find survey pages. Ensure that the survey is designed with at least one page."]);

            return null;
        }

        var pageContentItem = pageBagPart.ContentItems.First();

        // TODO, rename the bagPart to "Questions"
        var questionsBagPart = pageContentItem.Get<BagPart>(SurveyConstants.Questions);

        if (questionsBagPart == null || questionsBagPart.ContentItems == null || questionsBagPart.ContentItems.Count == 0)
        {
            _logger.LogError("Unable to get the BagPart from the Page content Item to determine the page questions. This most likely to incomplete survey.");

            _updateModelAccessor.ModelUpdater.ModelState.AddModelError(string.Empty, S["Unable to find questions on page. Ensure that the survey is designed with at least one page."]);

            return null;
        }

        var interview = await MakeInterviewAsync(survey.ContentItemId, survey.ContentItemVersionId, pageContentItem);

        // create new interview
        await _contentManager.CreateAsync(interview);

        return new InterviewResult()
        {
            IsComplete = false,
            Page = pageContentItem,
            Survey = survey,
            Interview = interview,
            Navigation = new PageNavigation()
            {
                CanGoBack = false,
                HasNextPage = pageBagPart.ContentItems.Count > 1,
                HasPreviousPage = false,
            }
        };
    }

    public async Task<InterviewResult> CurrentAsync(string interviewId)
    {
        var interview = await GetInterviewAsync(interviewId);

        return await CurrentAsync(interview);
    }

    public async Task<InterviewResult> CurrentAsync(ContentItem interview)
    {
        ArgumentNullException.ThrowIfNull(interview);

        var capsule = await GetInfoAsync(interview);

        if (capsule == null)
        {
            return null;
        }

        return new InterviewResult()
        {
            IsComplete = !SurveyConstants.Pending.Equals(capsule.Status, StringComparison.OrdinalIgnoreCase),
            Page = capsule.CurrentPage,
            Interview = interview,
            Survey = capsule.Survey,
            Navigation = new PageNavigation()
            {
                CanGoBack = capsule.PreviousPage != null,
                HasNextPage = capsule.NextPage != null,
                HasPreviousPage = capsule.PreviousPage != null,
            }
        };
    }

    public async Task<InterviewResult> TravelAsync(string interviewId, NavigationDirection direction)
    {
        var interview = await GetInterviewAsync(interviewId);

        return await TravelAsync(interview, direction);
    }

    public async Task<InterviewResult> TravelAsync(ContentItem interview, NavigationDirection direction)
    {
        ArgumentNullException.ThrowIfNull(interview);

        var capsule = await GetInfoAsync(interview);

        if (capsule == null)
        {
            return null;
        }

        if (SurveyConstants.Completed.Equals(capsule.Status, StringComparison.OrdinalIgnoreCase))
        {
            _updateModelAccessor.ModelUpdater.ModelState.AddModelError(string.Empty, S["This interview is already completed!"]);

            return InterviewCapsule.ToResult(capsule, interview);
        }

        // get questions on current page
        var questionPart = capsule.CurrentPage.Get<BagPart>(SurveyConstants.Questions);

        foreach (var question in questionPart.ContentItems)
        {
            var controlPart = question.Get<BagPart>(SurveyConstants.Inputs);

            foreach (var control in controlPart.ContentItems)
            {
                var prefix = $"question-{question.ContentItemId}_control-{control.ContentItemId}";

                await _contentItemDisplayManager.UpdateEditorAsync(control, _updateModelAccessor.ModelUpdater, false, SurveyConstants.InterviewContentType, prefix);
            }

            // since the inputs were updates with new values.
            // lets alter the question to save the updates
            question.Alter<BagPart>(SurveyConstants.Inputs, pa =>
            {
                pa.ContentItems = controlPart.ContentItems;
            });
        }

        // let update current page with the updates!
        capsule.CurrentPage.Alter<BagPart>(SurveyConstants.Questions, pa =>
        {
            pa.ContentItems = questionPart.ContentItems;
        });

        var stepsPart = interview.As<InterviewStepPart>();

        // Alter the visited paged by setting the current page from the capsule since that is the copy we are updating
        interview.Alter<InterviewStepPart>(pa =>
        {
            pa.VisitedPages = pa.VisitedPages.Select(x => x.ContentItemId == capsule.CurrentPage.ContentItemId ? capsule.CurrentPage : x).ToList();
        });

        // we attempted to validate the incoming data
        // check the results

        if (_updateModelAccessor.ModelUpdater.ModelState.IsValid)
        {
            var upcomingResult = await TravelAsync(capsule, interview, direction);

            if (upcomingResult.IsComplete)
            {
                await _interviewEvents.InvokeAsync((handler) => handler.CompletingAsync(interview), _logger);
            }
            // save the interview
            await _session.SaveAsync(interview);

            if (upcomingResult.IsComplete)
            {
                await _interviewEvents.InvokeAsync((handler) => handler.CompletedAsync(interview), _logger);
            }

            return upcomingResult;
        }

        // return the current page with errors
        return InterviewCapsule.ToResult(capsule, interview);
    }

    private async Task<int> TotalCompletedAsync(string surveyId, string userId, DateTime startAtUtc, DateTime endAtUtc)
    {
        var count = await _session.Query<ContentItem, InterviewIndex>(x => x.SurveyContentItemId == surveyId && x.IntervieweeId == userId && x.InterviewedAt >= startAtUtc && x.InterviewedAt <= endAtUtc && x.Status == SurveyConstants.Completed).CountAsync();

        return count;
    }

    private Task<InterviewResult> TravelAsync(InterviewCapsule capsule, ContentItem interview, NavigationDirection direction)
    {
        ArgumentNullException.ThrowIfNull(capsule);

        var stepPart = interview.As<InterviewStepPart>();

        if (direction == NavigationDirection.Next)
        {
            // advance ahead if you can!

            if (capsule.NextPage != null)
            {
                var result = new InterviewResult()
                {
                    Interview = interview,
                    Page = capsule.NextPage,
                    Survey = capsule.Survey,
                    IsComplete = false,
                    Navigation = new PageNavigation()
                    {
                        CanGoBack = true,
                        HasPreviousPage = true,
                    }
                };

                var pageAlreadyVisited = stepPart.VisitedPages.Any(x => x.ContentItemId == capsule.NextPage.ContentItemId);

                interview.Alter<InterviewStepPart>(part =>
                {
                    part.PageContentId = capsule.NextPage.ContentItemId;

                    if (!pageAlreadyVisited)
                    {
                        // since this is the first time we visit this page, lets mark it visited
                        part.VisitedPages.Add(capsule.NextPage);
                    }
                });


                if (!pageAlreadyVisited)
                {
                    var afterNextPage = GetNextPage(capsule.Pages, capsule.NextPage.ContentItemId);
                    result.Navigation.HasNextPage = afterNextPage != null;
                }

                return Task.FromResult(result);
            }

            // at this point the interview is completed
            interview.Alter<InterviewStepPart>(part =>
            {
                part.InterviewedAtUtc = _clock.UtcNow;
                part.Status = SurveyConstants.Completed;
            });

            capsule.Status = SurveyConstants.Completed;

            return Task.FromResult(InterviewCapsule.ToResult(capsule, interview));
        }

        // go back to previous page if you can!

        if (capsule.PreviousPage != null)
        {
            interview.Alter<InterviewStepPart>(part =>
            {
                // update the new current page to the previous page
                part.PageContentId = capsule.PreviousPage.ContentItemId;
            });

            var beforePrevious = GetPreviousPage(capsule.Pages, capsule.PreviousPage.ContentItemId);

            return Task.FromResult(new InterviewResult()
            {
                Interview = interview,
                Page = capsule.PreviousPage,
                Survey = capsule.Survey,
                IsComplete = false,
                Navigation = new PageNavigation()
                {
                    CanGoBack = beforePrevious != null,
                    HasPreviousPage = beforePrevious != null,
                    HasNextPage = true,
                }
            });
        }

        // return current page since we can't navigate backward anymore!
        return Task.FromResult(InterviewCapsule.ToResult(capsule, interview));
    }

    private async Task<ContentItem> GetInterviewAsync(string interviewId)
    {
        if (string.IsNullOrEmpty(interviewId))
        {
            throw new ArgumentNullException(nameof(interviewId));
        }

        // TODO, query interview index instead of this mess
        var interview = await _session.Query<ContentItem, ContentItemIndex>(x => x.ContentItemId == interviewId && x.ContentType == SurveyConstants.InterviewContentType && x.Published).FirstOrDefaultAsync();

        return interview;
    }

    private static ContentItem GetNextPage(IList<ContentItem> pages, string currentPageId)
    {
        var lastIndex = pages.Count - 1;

        for (var i = 0; i <= lastIndex; i++)
        {
            if (pages[i].ContentItemId == currentPageId)
            {
                if (i + 1 <= lastIndex)
                {
                    // found the next page!
                    return pages[i + 1];
                }
            }
        }

        return null;
    }

    private static ContentItem GetPreviousPage(IList<ContentItem> pages, string currentPageId)
    {
        var lastIndex = pages.Count - 1;

        for (var i = 0; i <= lastIndex; i++)
        {
            if (pages[i].ContentItemId == currentPageId)
            {
                if (i - 1 >= 0)
                {
                    // found previous page!
                    return pages[i - 1];
                }
            }
        }

        return null;
    }


    private async Task<ContentItem> MakeInterviewAsync(string contentItemId, string contentItemVersionId, ContentItem page)
    {
        string intervieweeId = null;

        if (await _httpContextAccessor.HttpContext.IsAuthenticatedAsync())
        {
            intervieweeId = await _httpContextAccessor.HttpContext.UserIdAsync();
        }

        var interview = await _contentManager.NewAsync(SurveyConstants.InterviewContentType);
        interview.Alter<SurveyIdentiferPart>(part =>
        {
            part.ContentItemId = contentItemId;
            part.ContentItemVersionId = contentItemVersionId;
        });

        interview.Alter<InterviewStepPart>(part =>
        {
            part.Status = SurveyConstants.Pending;
            part.PageContentId = page.ContentItemId;
            part.VisitedPages = [page];
            part.IntervieweeId = intervieweeId;
            part.InterviewedAtUtc = _clock.UtcNow;
        });

        return interview;
    }

    private async Task<InterviewCapsule> GetInfoAsync(ContentItem interview)
    {
        var surveyPart = interview.As<SurveyIdentiferPart>();
        var surveyId = surveyPart.ContentItemId;
        var surveyVersionId = surveyPart.ContentItemVersionId;

        if (string.IsNullOrEmpty(surveyVersionId))
        {
            _logger.LogError("Unable to get survey info from the given interview");

            _updateModelAccessor.ModelUpdater.ModelState.AddModelError(string.Empty, S["Unknown error. Unable to get survey info from the given interview."]);

            return null;
        }

        // TODO, make sure the current user has privileges to the current interview.

        // TODO, store surveys in an index and query by SurveyIndex
        var survey = await _session.Query<ContentItem, ContentItemIndex>(x => x.ContentItemVersionId == surveyVersionId && x.ContentType == SurveyConstants.SurveyContentType).FirstOrDefaultAsync();

        if (survey == null)
        {
            _logger.LogError("Unable to get survey info from the given interview");

            _updateModelAccessor.ModelUpdater.ModelState.AddModelError(string.Empty, S["Unknown error. Unable to get survey info from the given interview."]);

            return null;
        }

        var interviewStepPart = interview.As<InterviewStepPart>();

        var currentPageId = interviewStepPart?.PageContentId;

        if (interviewStepPart == null || string.IsNullOrEmpty(currentPageId))
        {
            _logger.LogError("Unable to get interview step info from the given interview");

            _updateModelAccessor.ModelUpdater.ModelState.AddModelError(string.Empty, S["Unknown error. Unable to get interview step into from the given interview."]);

            return null;
        }
        var pageBagPart = survey.Get<BagPart>(SurveyConstants.Pages);

        if (pageBagPart == null || pageBagPart.ContentItems == null || pageBagPart.ContentItems.Count == 0)
        {
            _logger.LogError("Unable to get the BagPart from the Survey content Item to determine the survey page. This most likely to incomplete survey");

            _updateModelAccessor.ModelUpdater.ModelState.AddModelError(string.Empty, S["Unable to find survey pages. Ensure that the survey is designed with at least one page."]);

            return null;
        }

        // attempt to get the current page from the visited paged, because visited pages has previously provided values
        var currentPage = interviewStepPart.VisitedPages.FirstOrDefault(x => x.ContentItemId == currentPageId);

        var nextPage = GetNextPage(pageBagPart.ContentItems, currentPageId);
        var previousPage = GetPreviousPage(pageBagPart.ContentItems, currentPageId);

        return new InterviewCapsule()
        {
            Survey = survey,
            Pages = pageBagPart.ContentItems,
            NextPage = nextPage,
            PreviousPage = previousPage,
            CurrentPage = currentPage,
            Status = interviewStepPart.Status ?? SurveyConstants.Pending,
        };
    }

    private sealed class InterviewCapsule
    {
        public ContentItem Survey { get; set; }

        public List<ContentItem> Pages { get; set; }

        public ContentItem NextPage { get; set; }

        public ContentItem CurrentPage { get; set; }
        public ContentItem PreviousPage { get; set; }

        public string Status { get; set; }

        public static InterviewResult ToResult(InterviewCapsule capsule, ContentItem interview)
        {
            return new InterviewResult()
            {
                IsComplete = SurveyConstants.Completed.Equals(capsule.Status, StringComparison.OrdinalIgnoreCase),
                Page = capsule.CurrentPage,
                Interview = interview,
                Survey = capsule.Survey,
                Navigation = new PageNavigation()
                {
                    CanGoBack = capsule.PreviousPage != null,
                    HasNextPage = capsule.NextPage != null,
                    HasPreviousPage = capsule.PreviousPage != null,
                }
            };
        }

    }
}
