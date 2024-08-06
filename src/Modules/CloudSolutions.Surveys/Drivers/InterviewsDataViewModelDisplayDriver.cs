using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Indexes;
using CloudSolutions.Surveys.ViewModels;
using CrestApps.Components.ViewModels;
using CrestApps.Support;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.ContentManagement;
using OrchardCore.DisplayManagement.Handlers;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Entities;
using OrchardCore.Modules;
using OrchardCore.Mvc.ModelBinding;
using OrchardCore.ResourceManagement;
using YesSql;

namespace CloudSolutions.Surveys.Drivers;

public sealed class InterviewsDataViewModelDisplayDriver : DisplayDriver<InterviewsDataViewModel>
{
    private const string ComponentName = "CrestApps.Components-datetime-picker";

    private readonly IResourceManager _resourceManager;
    private readonly ILocalClock _clock;
    private readonly ISession _session;
    private readonly ILogger _logger;

    internal readonly IStringLocalizer S;

    public InterviewsDataViewModelDisplayDriver(IResourceManager resourceManager,
        ILocalClock clock,
        IStringLocalizer<InterviewsDataViewModelDisplayDriver> stringLocalizer,
        ISession session,
        ILogger<InterviewsDataViewModelDisplayDriver> logger)
    {
        _resourceManager = resourceManager;
        _clock = clock;
        S = stringLocalizer;
        _session = session;
        _logger = logger;
    }

    public override IDisplayResult Edit(InterviewsDataViewModel model)
    {
        // The component name is coming from external project and should not change.
        _resourceManager.RegisterResource("script", ComponentName).AtFoot();
        _resourceManager.RegisterResource("stylesheet", ComponentName).AtHead();

        var range = Initialize<DateTimeRangeViewModel>("DateTimeRange_Edit", async vm =>
        {
            var now = await _clock.LocalNowAsync;
            var currentRange = model.As<DateTimeRangeViewModel>();

            vm.From = currentRange.From ?? now.DateTime.Date;
            vm.To = currentRange.To ?? now.DateTime.EndOfDay();
        }).Location("Content:1");

        var survey = Initialize<SurveyVersionMenuViewModel>("SurveyVersionMenu_Edit", vm =>
        {
            var currentSurvey = model.As<SurveyVersionMenuViewModel>();

            vm.VersionId = currentSurvey.VersionId;
        }).Location("Content:10");

        var users = Initialize<IntervieweeMenuViewModel>("IntervieweeMenu_Edit", vm =>
        {
            var currentMenu = model.As<IntervieweeMenuViewModel>();

            vm.UserId = currentMenu.UserId;
        }).Location("Content:20");

        return Combine(range, survey, users);
    }

    public override async Task<IDisplayResult> UpdateAsync(InterviewsDataViewModel model, UpdateEditorContext context)
    {
        var rangeVm = new DateTimeRangeViewModel();

        await context.Updater.TryUpdateModelAsync(rangeVm, Prefix);

        if (!rangeVm.From.HasValue)
        {
            context.Updater.ModelState.AddModelError(Prefix, nameof(rangeVm.From), S["The From field is required."]);
        }

        if (!rangeVm.To.HasValue)
        {
            context.Updater.ModelState.AddModelError(Prefix, nameof(rangeVm.To), S["The To field is required."]);
        }

        var surveyVm = new SurveyVersionMenuViewModel();

        await context.Updater.TryUpdateModelAsync(surveyVm, Prefix);

        model.Survey = await _session.SurveyByVersionAsync(surveyVm.VersionId);

        if (model.Survey == null)
        {
            context.Updater.ModelState.AddModelError(Prefix, nameof(surveyVm.VersionId), S["The selected survey is no longer available!"]);
        }

        var userVm = new IntervieweeMenuViewModel();

        await context.Updater.TryUpdateModelAsync(userVm, Prefix);

        _logger.LogTrace("InterviewsDataViewModelDisplayDriver: finished validating everything and the state model is {}", context.Updater.ModelState.IsValid);

        if (context.Updater.ModelState.IsValid)
        {
            var fromUtc = await _clock.ConvertToUtcAsync(rangeVm.From.Value);
            var toUtc = await _clock.ConvertToUtcAsync(rangeVm.To.Value);

            if (!string.IsNullOrEmpty(userVm?.UserId))
            {
                model.Conditions.Add(x => x.With<InterviewIndex>(y => y.InterviewedAt >= fromUtc && y.InterviewedAt <= toUtc && y.SurveyVersionId == surveyVm.VersionId && y.Status == SurveyConstants.Completed && y.IntervieweeId == userVm.UserId));
            }
            else
            {
                model.Conditions.Add(x => x.With<InterviewIndex>(y => y.InterviewedAt >= fromUtc && y.InterviewedAt <= toUtc && y.SurveyVersionId == surveyVm.VersionId && y.Status == SurveyConstants.Completed));
            }
        }

        model.Put(rangeVm);
        model.Put(surveyVm);
        model.Put(userVm);

        return Edit(model);
    }
}
