using CloudSolutions.Surveys.Core.Indexes;
using CloudSolutions.Surveys.ViewModels;
using CloudSolutions.Teams;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Http;
using OrchardCore.DisplayManagement.Handlers;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Entities;

namespace CloudSolutions.Surveys.Drivers;

public sealed class InterviewsDataViewModelWithTeamDisplayDriver : DisplayDriver<InterviewsDataViewModel>
{
    private readonly ITeamStore _teamStore;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public InterviewsDataViewModelWithTeamDisplayDriver(
        ITeamStore teamStore,
        IHttpContextAccessor httpContextAccessor)
    {
        _teamStore = teamStore;
        _httpContextAccessor = httpContextAccessor;
    }

    public override IDisplayResult Edit(InterviewsDataViewModel model)
    {
        return Initialize<TeamMenuViewModel>("TeamMenu_Edit", async vm =>
        {
            var currentTeam = model.As<TeamMenuViewModel>();
            vm.TeamId = currentTeam?.TeamId;

            var userId = await _httpContextAccessor.HttpContext.UserIdAsync();
            vm.Teams = await _teamStore.GetAccessibleItemsAsync(userId);
        }).Location("Content:15");
    }

    public override async Task<IDisplayResult> UpdateAsync(InterviewsDataViewModel model, UpdateEditorContext context)
    {
        var userId = await _httpContextAccessor.HttpContext.UserIdAsync();

        var vm = new TeamMenuViewModel();

        await context.Updater.TryUpdateModelAsync(vm, Prefix);

        if (!string.IsNullOrWhiteSpace(vm.TeamId))
        {
            model.Conditions.Add(x => x.With<InterviewTeamIndex>(y => y.TeamId == vm.TeamId));
        }

        model.Put(vm);

        return Edit(model);
    }
}
