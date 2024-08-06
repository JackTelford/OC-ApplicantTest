using CloudSolutions.Surveys.Controllers;
using Microsoft.Extensions.Localization;
using OrchardCore.Navigation;

namespace CloudSolutions.Surveys;

public sealed class ReportsAdminMenu : INavigationProvider
{
    internal readonly IStringLocalizer S;

    public ReportsAdminMenu(IStringLocalizer<ReportsAdminMenu> stringLocalizer)
    {
        S = stringLocalizer;
    }

    public Task BuildNavigationAsync(string name, NavigationBuilder builder)
    {
        if (!NavigationHelper.IsAdminMenu(name))
        {
            return Task.CompletedTask;
        }

        builder
            .Add(S["Reports"], reports => reports
                .Add(S["Interview Data"], S["Interview Data"].PrefixPosition(), report => report
                    .Action(nameof(ReportsController.InterviewsData), ReportsController.Name, Startup.ModuleName)
                    .Permission(SurveyReportPermission.RunInterviewDataReport)
                    .LocalNav()
                )
                .Add(S["Report Settings"], "ZZZ".PrefixPosition(), settings => settings
                    .Action(nameof(ReportParamsController.Index), ReportParamsController.Name, Startup.ModuleName)
                    .Permission(SurveyReportPermission.ManageReportSettings)
                    .LocalNav()
                )
            );

        return Task.CompletedTask;
    }
}
