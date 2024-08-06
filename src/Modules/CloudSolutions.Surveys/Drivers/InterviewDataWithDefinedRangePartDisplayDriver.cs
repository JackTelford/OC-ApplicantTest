using CloudSolutions.Charts.Models;
using CloudSolutions.Charts.ViewModels;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.Services;
using CloudSolutions.Surveys.ViewModels;
using CloudSolutions.Teams;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Http;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Mvc.ModelBinding;

namespace CloudSolutions.Surveys.Drivers;

public sealed class InterviewDataWithDefinedRangePartDisplayDriver : ContentPartDisplayDriver<InterviewDataWithDefinedRangePart>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly InterviewDataProvider _interviewDataProvider;
    private readonly ITeamStore _teamStore;

    internal readonly IStringLocalizer S;

    public InterviewDataWithDefinedRangePartDisplayDriver(IStringLocalizer<InterviewDataWithDefinedRangePartDisplayDriver> stringLocalizer,
        IHttpContextAccessor httpContextAccessor,
        InterviewDataProvider interviewDataProvider,
        ITeamStore teamStore)
    {
        _httpContextAccessor = httpContextAccessor;
        S = stringLocalizer;
        _interviewDataProvider = interviewDataProvider;
        _teamStore = teamStore;
    }


    public async override Task<IDisplayResult> DisplayAsync(InterviewDataWithDefinedRangePart part, BuildPartDisplayContext context)
    {
        if (context.DisplayType == "SummaryAdmin")
        {
            return null;
        }

        if (!await _httpContextAccessor.HttpContext.IsAuthenticatedAsync())
        {
            return null;
        }

        // Here we need to pull the interview data and create the chart
        // return shape ChartViewModel
        var chartPart = part.ContentItem.As<ChartInfoPart>();

        var vm = await _interviewDataProvider.GetAsync(part, chartPart);

        if (vm == null || vm.Data.Datasets.Count == 0 || vm.Data.Labels.Count == 0)
        {
            return null;
        }

        var chartShape = Initialize<ChartViewModel>(nameof(ChartViewModel), viewModel =>
        {
            viewModel.Type = vm.Type;
            viewModel.Data = vm.Data;
            viewModel.Options = vm.Options;
            viewModel.AdditionalData = vm.AdditionalData;
        }).Location("Content:5");

        if (InterviewDataWithDefinedRangePartViewModel.ShowTeamSelection(part.DataSource))
        {
            var teamMenuShape = Initialize<TeamSelectMenuViewModel>(nameof(TeamSelectMenuViewModel), async viewModel =>
            {
                viewModel.WidgetContentItemId = part.ContentItem.ContentItemId;

                if (InterviewDataWithDefinedRangePartViewModel.IsAccessibleTeamData(part.DataSource))
                {
                    var userId = await _httpContextAccessor.HttpContext.UserIdAsync();
                    viewModel.Options = await _teamStore.GetAccessibleItemsAsync(userId);
                }
                else if (part.TeamIds != null && part.TeamIds.Length > 0)
                {
                    viewModel.Options = await _teamStore.GetItemsAsync(part.TeamIds);
                }

            }).Location("Content:1");

            return Combine(chartShape, teamMenuShape);
        }

        return chartShape;
    }

    public override Task<IDisplayResult> EditAsync(InterviewDataWithDefinedRangePart part, BuildPartEditorContext context)
    {
        if (context.IsNew)
        {
            return Task.FromResult<IDisplayResult>(Initialize<InterviewDataWithDefinedRangePartViewModel>(nameof(InterviewDataWithDefinedRangePartViewModel), viewModel =>
            {

            }).Location("Content:5"));
        }

        return Task.FromResult<IDisplayResult>(Initialize<InterviewDataWithDefinedRangePartViewModel>(nameof(InterviewDataWithDefinedRangePartViewModel), viewModel =>
        {
            viewModel.SurveyVersionId = part.SurveyVersionId;
            viewModel.Range = part.Range;
            viewModel.DataSource = part.DataSource;
            viewModel.Teams = part.TeamIds;
            viewModel.InputIds = part.InputIds;
        }).Location("Content:5"));
    }

    public async override Task<IDisplayResult> UpdateAsync(InterviewDataWithDefinedRangePart part, IUpdateModel updater, UpdatePartEditorContext context)
    {
        var vm = new InterviewDataWithDefinedRangePartViewModel();

        await updater.TryUpdateModelAsync(vm, Prefix);

        if (string.IsNullOrWhiteSpace(vm.SurveyVersionId))
        {
            updater.ModelState.AddModelError(Prefix, nameof(vm.SurveyVersionId), S["Please select a survey"]);
        }

        if (string.IsNullOrEmpty(vm.Range) || !InterviewDataWithDefinedRangePartViewModel.RangeOptions.Any(x => x.Value == vm.Range))
        {
            updater.ModelState.AddModelError(Prefix, nameof(vm.SurveyVersionId), S["Please select a range"]);
        }

        if (string.IsNullOrEmpty(vm.DataSource) || !InterviewDataWithDefinedRangePartViewModel.DataSourceOptions.Any(x => x.Value == vm.DataSource))
        {
            updater.ModelState.AddModelError(Prefix, nameof(vm.SurveyVersionId), S["Please select a data source"]);
        }

        if (!string.IsNullOrEmpty(vm.DataSource) && vm.IsSpecificTeams() && (vm.Teams == null || vm.Teams.Length == 0))
        {
            updater.ModelState.AddModelError(Prefix, nameof(vm.SurveyVersionId), S["Please select at least one team"]);
        }

        if (vm.InputIds == null || vm.InputIds.Length == 0)
        {
            updater.ModelState.AddModelError(Prefix, nameof(vm.SurveyVersionId), S["Please select at least one input to show on the chart"]);
        }

        part.SurveyVersionId = vm.SurveyVersionId;
        part.Range = vm.Range;
        part.DataSource = vm.DataSource;
        part.TeamIds = null;
        part.InputIds = vm.InputIds;

        if (vm.IsSpecificTeams())
        {
            part.TeamIds = vm.Teams;
        }

        return Edit(part);
    }
}
