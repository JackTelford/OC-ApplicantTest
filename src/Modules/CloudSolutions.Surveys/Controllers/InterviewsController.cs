using System.Security.Claims;
using System.Text.Json;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Indexes;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.Services;
using CloudSolutions.Surveys.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Http;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Records;
using OrchardCore.DisplayManagement;
using OrchardCore.DisplayManagement.ModelBinding;
using YesSql;

namespace CloudSolutions.Surveys.Controllers;

public sealed class InterviewsController : Controller
{
    private readonly IContentItemDisplayManager _contentItemDisplayManager;
    private readonly YesSql.ISession _session;
    private readonly IUpdateModelAccessor _updateModelAccessor;
    private readonly IInterviewManager _interviewManager;
    private readonly ILogger _logger;
    private readonly IContentDefinitionManager _contentDefinitionManager;
    private readonly IHttpContextAccessor _httpContextAccessor;

    internal readonly IStringLocalizer S;

    public InterviewsController(IContentItemDisplayManager contentItemDisplayManager,
        YesSql.ISession session,
        IUpdateModelAccessor updateModelAccessor,
        IHttpContextAccessor httpContextAccessor,
        IInterviewManager interviewManager,
        ILogger<InterviewsController> logger,
        IStringLocalizer<InterviewsController> stringLocalizer,
        IContentDefinitionManager contentDefinitionManager)
    {
        _contentItemDisplayManager = contentItemDisplayManager;
        _session = session;
        _updateModelAccessor = updateModelAccessor;
        _interviewManager = interviewManager;
        _logger = logger;
        S = stringLocalizer;
        _contentDefinitionManager = contentDefinitionManager;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ActionResult> Start(string surveyId)
    {
        if (string.IsNullOrWhiteSpace(surveyId))
        {
            return NotFound();
        }

        var definition = await _contentDefinitionManager.GetTypeDefinitionAsync(SurveyConstants.SurveyContentType);

        if (definition == null)
        {
            return NotFound();
        }

        var survey = await _session.Query<ContentItem, ContentItemIndex>(x => x.ContentItemId == surveyId && x.ContentType == SurveyConstants.SurveyContentType && x.Published)
            .FirstOrDefaultAsync();

        if (survey == null)
        {
            return NotFound();
        }

        if (!AllowAnonymous(survey))
        {
            if (!await _httpContextAccessor.HttpContext.AuthorizeAsync(SurveyPermissions.CompleteInterview))
            {
                return Forbid();
            }

            var userId = await _httpContextAccessor.HttpContext.UserIdAsync();

            var startResult = await _interviewManager.CanStartAsync(survey, userId);

            if (!startResult.Allow)
            {
                return View("Prevent", new CompletedInterviewViewModel()
                {
                    Message = startResult.Error,
                });
            }
        }

        var interviewResult = await _interviewManager.StartAsync(survey);

        if (interviewResult == null)
        {
            return NotFound();
        }

        if (!ModelState.IsValid)
        {
            return View(nameof(Start), surveyId);
        }

        return RedirectToResume(interviewResult);
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<ActionResult> Save(SaveInterviewViewModel viewModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        var interview = await _session.QueryIndex<InterviewIndex>(x => x.InterviewId == viewModel.InterviewId)
            .FirstOrDefaultAsync();

        if (interview == null)
        {
            return NotFound();
        }

        if (!string.IsNullOrEmpty(interview.IntervieweeId) && interview.IntervieweeId != CurrentUserId())
        {
            return Forbid();
        }

        var interviewResult = await _interviewManager.TravelAsync(viewModel.InterviewId, viewModel.Direction.Value);

        if (interviewResult == null)
        {
            return NotFound();
        }

        // display manager can raise error, so we'll need to check the model state before moving forward
        if (_updateModelAccessor.ModelUpdater.ModelState.IsValid)
        {
            // get the upcoming page
            // interviewResult = await _interviewManager.TravelAsync(interviewResult.Interview, viewModel.Direction.Value);

            if (interviewResult.IsComplete)
            {
                return await CompleteAsync(interviewResult);
            }

            // redirect the use to the new page while keeping the session
            return RedirectToResume(interviewResult);
        }

        // return the same page without redirecting to show errors
        return await ResumeAsync(interviewResult);
    }


    public async Task<ActionResult> Resume(string interviewId)
    {
        if (string.IsNullOrWhiteSpace(interviewId))
        {
            return NotFound();
        }

        var interview = await _session.QueryIndex<InterviewIndex>(x => x.InterviewId == interviewId)
            .FirstOrDefaultAsync();

        if (interview == null)
        {
            return NotFound();
        }

        if (!string.IsNullOrEmpty(interview.IntervieweeId) && interview.IntervieweeId != CurrentUserId())
        {
            return Forbid();
        }

        // when the temp-data contains interviewResult, means another method redirected the user here
        // this is to save the time required to pull the current interview again.
        var interviewResult = TempData.TryGetValue("interviewResult", out var value) ? JsonSerializer.Deserialize<InterviewResult>(value.ToString()) : null;

        // at this point, we can't find interviewResult in the temp data,
        // lets fetch it from the interview manager.
        // this just means that the user is revisiting this page manually.
        interviewResult ??= await _interviewManager.CurrentAsync(interviewId);

        return await ResumeAsync(interviewResult);
    }

    public async Task<ActionResult> Completed(string interviewId)
    {
        if (string.IsNullOrWhiteSpace(interviewId))
        {
            return NotFound();
        }

        var interview = await _session.QueryIndex<InterviewIndex>(x => x.InterviewId == interviewId)
            .FirstOrDefaultAsync();

        if (interview == null)
        {
            return NotFound();
        }

        if (!string.IsNullOrEmpty(interview.IntervieweeId) && interview.IntervieweeId != CurrentUserId())
        {
            return Forbid();
        }

        // when the temp-data contains interviewResult, means another method redirected the user here
        // this is to save the time required to pull the current interview again.
        var viewModel = TempData.TryGetValue("completedResult", out var value) ? JsonSerializer.Deserialize<CompletedInterviewViewModel>(value.ToString()) : null;

        TempData.Keep("completedResult");

        if (viewModel == null || viewModel.InterviewId != interviewId)
        {
            return BadRequest();
        }

        return View(viewModel);
    }

    private async Task<ActionResult> ResumeAsync(InterviewResult interviewResult, IShape pageShape = null)
    {
        if (interviewResult == null)
        {
            return NotFound();
        }

        if (interviewResult.IsComplete)
        {
            return await CompleteAsync(interviewResult);
        }

        if (!AllowAnonymous(interviewResult.Survey))
        {
            if (!await _httpContextAccessor.HttpContext.AuthorizeAsync(SurveyPermissions.CompleteInterview))
            {
                return Forbid();
            }

            var userId = await _httpContextAccessor.HttpContext.UserIdAsync();

            var startResult = await _interviewManager.CanStartAsync(interviewResult.Survey, userId);

            if (!startResult.Allow)
            {
                return View("Prevent", new CompletedInterviewViewModel()
                {
                    Message = startResult.Error,
                });
            }
        }

        var viewModel = new InterviewPageViewModel()
        {
            InterviewId = interviewResult.Interview.ContentItemId,
            PageShape = pageShape ?? await _contentItemDisplayManager.BuildEditorAsync(interviewResult.Page, _updateModelAccessor.ModelUpdater, false, SurveyConstants.InterviewContentType, string.Empty),
            CanGoBack = interviewResult.Navigation.CanGoBack,
            IsLastPage = !interviewResult.Navigation.HasNextPage,
        };

        return View("Resume", viewModel);
    }

    private static bool AllowAnonymous(ContentItem survey)
    {
        var part = survey.As<AnonymousSurveyPart>();

        var allowAnonymous = part?.AllowAnonymous ?? false;
        return allowAnonymous;
    }

    private ActionResult RedirectToResume(InterviewResult interviewResult)
    {
        if (interviewResult == null)
        {
            return NotFound();
        }

        // TempData["interviewResult"] = JsonConvert.SerializeObject(interviewResult);
        // TempData.Keep("interviewResult");

        return RedirectToAction(nameof(Resume), new { interviewId = interviewResult.Interview.ContentItemId });
    }

    private async Task<ActionResult> CompleteAsync(InterviewResult interviewResult)
    {
        if (!interviewResult.IsComplete)
        {
            return await ResumeAsync(interviewResult);
        }

        var surveyPart = interviewResult.Survey.As<SurveyPart>();

        var viewModel = new CompletedInterviewViewModel
        {
            InterviewId = interviewResult.Interview.ContentItemId,
            Message = surveyPart?.CompletedMessage.Text,
        };

        TempData["completedResult"] = JsonSerializer.Serialize(viewModel);

        return RedirectToAction(nameof(Completed), new { interviewId = interviewResult.Interview.ContentItemId });
    }
    private string CurrentUserId()
    {
        return User.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}
