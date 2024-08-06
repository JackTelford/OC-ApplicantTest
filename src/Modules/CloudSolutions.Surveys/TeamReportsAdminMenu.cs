using CloudSolutions.Surveys.Controllers;
using Microsoft.Extensions.Localization;
using OrchardCore.Mvc.Core.Utilities;
using OrchardCore.Navigation;

namespace CloudSolutions.Surveys;

public sealed class TeamReportsAdminMenu : INavigationProvider
{
    internal readonly IStringLocalizer S;

    public TeamReportsAdminMenu(IStringLocalizer<ReportsAdminMenu> stringLocalizer)
    {
        S = stringLocalizer;
    }

    public Task BuildNavigationAsync(string name, NavigationBuilder builder)
    {
        if (!NavigationHelper.IsAdminMenu(name))
        {
            return Task.CompletedTask;
        }

        var reportsControllerName = typeof(TeamReportsController).ControllerName();

        builder
            .Add(S["Reports"], reports => reports
                .Add(S["Interview Data by Team"], S["Interview Data by Team"].PrefixPosition(), importer => importer
                    .Action(nameof(TeamReportsController.InterviewsDataByTeam), reportsControllerName, Startup.ModuleName)
                    .Permission(SurveyReportPermission.RunInterviewDataReportByTeam)
                    .LocalNav()
                )
        );

        return Task.CompletedTask;
    }
}
