using CloudSolutions.ContentRestrictions.Core;
using CloudSolutions.Surveys.Controllers;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Indexes;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.Drivers;
using CloudSolutions.Surveys.Handlers;
using CloudSolutions.Surveys.Indexes;
using CloudSolutions.Surveys.Migrations;
using CloudSolutions.Surveys.Models;
using CloudSolutions.Surveys.Services;
using CloudSolutions.Surveys.ViewModels;
using CloudSolutions.Surveys.Workflows.Activities;
using CloudSolutions.Surveys.Workflows.DisplayDriver;
using Fluid;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using OrchardCore.Admin;
using OrchardCore.Admin.Models;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Handlers;
using OrchardCore.Data;
using OrchardCore.Data.Migration;
using OrchardCore.DisplayManagement.Descriptors;
using OrchardCore.DisplayManagement.Handlers;
using OrchardCore.Modules;
using OrchardCore.Mvc.Core.Utilities;
using OrchardCore.Navigation;
using OrchardCore.ResourceManagement;
using OrchardCore.Security.Permissions;
using OrchardCore.Workflows.Helpers;

namespace CloudSolutions.Surveys;

// TO DO, create a new feature CloudSolutions.Surveys.Interviews
// That allows a user to complete interviews
public sealed class Startup : StartupBase
{
    private readonly AdminOptions _adminOptions;

    public static string ModuleName => "CloudSolutions.Surveys";

    public Startup(IOptions<AdminOptions> adminOptions)
    {
        _adminOptions = adminOptions.Value;
    }

    public override void ConfigureServices(IServiceCollection services)
    {
        services.AddContentPart<ContentVersionPart>();
        services.AddContentPart<InterviewPart>();
        services.AddContentPart<InterviewStepPart>();
        services.AddContentPart<SurveyIdentiferPart>();
        services.AddContentPart<SurveyPagePart>();
        services.AddContentPart<SurveyPart>();
        services.AddContentPart<InterviewLinkPart>()
                .UseDisplayDriver<InterviewLinkPartDisplayDriver>();

        // services for reports
        services.AddScoped<InterviewsDataReportProvider>();
        services.AddScoped<INavigationProvider, ReportsAdminMenu>();
        services.AddScoped<IPermissionProvider, SurveyReportPermissionsProvider>();

        services.AddContentPart<SurveyQuestionPart>();

        services.AddContentPart<PredefinedListSurveyControlPart>()
                .UseDisplayDriver<PredefinedListSurveyControlPartDisplayDriver>();

        services.AddContentPart<NumericValueSurveyControlPart>()
                .UseDisplayDriver<NumericValueSurveyControlPartDisplayDriver>();

        services.AddContentPart<TextValueSurveyControlPart>()
                .UseDisplayDriver<TextValueSurveyControlPartDisplayDriver>();

        services.AddDataMigration<SurveyMigrations>();
        services.AddDataMigration<SurveyPageMigrations>();
        services.AddDataMigration<SurveyQuestionMigrations>();

        services.AddScoped<IContentDisplayDriver, SurveyPageContentItemDisplayDriver>();
        services.AddScoped<IContentDisplayDriver, SurveyQuestionContentItemDisplayDriver>();

        services.AddIndexProvider<InterviewIndexProvider>();
        services.AddDataMigration<SurveyQuestionMigrations>();
        services.AddDataMigration<InterviewMigrations>();
        services.AddDataMigration<PredefinedListSurveyControlPartMigrations>();
        services.AddDataMigration<NumericValueSurveyControlPartMigrations>();
        services.AddDataMigration<SurveyRestrictionPartMigrations>();
        services.AddDataMigration<TextValueSurveyControlPartMigrations>();

        services.AddScoped<IInterviewManager, InterviewManager>();
        services.AddScoped<ISurveyPresenter, SurveyPresenter>();

        services.AddScoped<IShapeTableProvider, SurveyControlShapeTableManager>();
        services.AddScoped<IPermissionProvider, SurveyPermissionsProvider>();

        services.AddScoped<IInterviewDataPresenter, InterviewDataPresenter>();
        services.AddSingleton<IConfigureOptions<ResourceManagementOptions>, SurveyResourceManagementManifest>();

        services.AddContentPart<SurveyRestrictionPart>()
                .UseDisplayDriver<SurveyRestrictionPartDisplayDriver>();

        services.AddScoped<IDisplayDriver<InterviewsDataViewModel>, InterviewsDataViewModelDisplayDriver>();

        services.AddContentPart<AnonymousSurveyPart>()
            .UseDisplayDriver<AnonymousSurveyPartDisplayDriver>();

        services.AddContentRestrictionServices();
        services.AddSingleton<ReportParametersDocumentService>();

        services.AddScoped<IDisplayDriver<Navbar>, ReportSettingsNavbarDisplayDriver>();
    }

    public override void Configure(IApplicationBuilder app, IEndpointRouteBuilder routes, IServiceProvider serviceProvider)
    {
        routes.MapAreaControllerRoute(
            name: "StartInterview",
            areaName: ModuleName,
            pattern: "interviews/start/{surveyId}",
            defaults: new { controller = typeof(InterviewsController).ControllerName(), action = nameof(InterviewsController.Start) }
        );

        routes.MapAreaControllerRoute(
            name: "SaveInterview",
            areaName: ModuleName,
            pattern: "interviews/save/{interviewId}",
            defaults: new { controller = typeof(InterviewsController).ControllerName(), action = nameof(InterviewsController.Save) }
        );

        routes.MapAreaControllerRoute(
            name: "ResumeInterview",
            areaName: ModuleName,
            pattern: "interviews/resume/{interviewId}",
            defaults: new { controller = typeof(InterviewsController).ControllerName(), action = nameof(InterviewsController.Resume) }
        );

        routes.MapAreaControllerRoute(
            name: "CompleteInterview",
            areaName: ModuleName,
            pattern: "interviews/completed/{interviewId}",
            defaults: new { controller = typeof(InterviewsController).ControllerName(), action = nameof(InterviewsController.Completed) }
        );

        routes.MapAreaControllerRoute(
            name: "InterviewsDataReport",
            areaName: ModuleName,
            pattern: "interviews/reports/InterviewsData",
            defaults: new { controller = typeof(ReportsController).ControllerName(), action = nameof(ReportsController.InterviewsData) }
        );

        routes.MapAreaControllerRoute(
            name: "InterviewsDataReport1",
            areaName: ModuleName,
            pattern: "interviews/reports/InterviewsData1",
            defaults: new { controller = typeof(ReportsController).ControllerName(), action = nameof(ReportsController.InterviewsData1) }
        );

        routes.MapAreaControllerRoute(
            name: "ReportStructuresColumns",
            areaName: ModuleName,
            pattern: "reportStructures/columns/{surveyVersionId}",
            defaults: new { controller = typeof(ReportStructuresController).ControllerName(), action = nameof(ReportStructuresController.Columns) }
        );

        routes.MapAreaControllerRoute(
            name: "ReportStructuresChartData",
            areaName: ModuleName,
            pattern: "Charts/TeamOverview/{widgetId}",
            defaults: new { controller = typeof(ChartsController).ControllerName(), action = nameof(ChartsController.TeamOverview) }
        );

        var paramsControllerName = typeof(ReportParamsController).ControllerName();

        routes.MapAreaControllerRoute(
            name: "ListReportSettings",
            areaName: ModuleName,
            pattern: _adminOptions.AdminUrlPrefix + "/report-settings",
            defaults: new { controller = paramsControllerName, action = nameof(ReportParamsController.Index) }
        );

        routes.MapAreaControllerRoute(
            name: "CreateReportSettings",
            areaName: ModuleName,
            pattern: _adminOptions.AdminUrlPrefix + "/report-settings/create",
            defaults: new { controller = paramsControllerName, action = nameof(ReportParamsController.Create) }
        );

        routes.MapAreaControllerRoute(
             name: "EditReportSettings",
             areaName: ModuleName,
             pattern: _adminOptions.AdminUrlPrefix + "/report-settings/edit/{id}",
             defaults: new { controller = paramsControllerName, action = nameof(ReportParamsController.Edit) }
         );

        routes.MapAreaControllerRoute(
             name: "DisplayReportSettings",
             areaName: ModuleName,
             pattern: _adminOptions.AdminUrlPrefix + "/view-report/{id}",
             defaults: new { controller = paramsControllerName, action = nameof(ReportParamsController.Display) }
         );
    }
}

[RequireFeatures("OrchardCore.Notifications")]
public sealed class SurveyNotification : StartupBase
{
    public override void ConfigureServices(IServiceCollection services)
    {
        services.AddScoped<IInterviewHandler, NotifyCoachesWhenThresholdWasReached>();
    }
}

[Feature("CloudSolutions.Surveys.Teams")]
public sealed class SurveyWithTeamsStartup : StartupBase
{
    public override void ConfigureServices(IServiceCollection services)
    {
        services.AddScoped<IContentHandler, AttachCurrentTeamToInteviewHandler>();
        services.AddScoped<INavigationProvider, TeamReportsAdminMenu>();
        services.AddScoped<IPermissionProvider, TeamSurveyReportPermissionsProvider>();
        services.TryAddScoped<InterviewDataProvider>();
        services.AddDataMigration<InterviewTeamMigrations>();
        services.AddIndexProvider<InterviewTeamIndexProvider>();
        services.AddScoped<IDisplayDriver<InterviewsDataViewModel>, InterviewsDataViewModelWithTeamDisplayDriver>();
    }

    public override void Configure(IApplicationBuilder app, IEndpointRouteBuilder routes, IServiceProvider serviceProvider)
    {
        routes.MapAreaControllerRoute(
            name: "InterviewsDataReportByTeam",
            areaName: Startup.ModuleName,
            pattern: "interviews/reports/InterviewsDataByTeam",
            defaults: new { controller = typeof(TeamReportsController).ControllerName(), action = nameof(TeamReportsController.InterviewsDataByTeam) }
        );
    }
}

[Feature("CloudSolutions.Surveys.Charts")]
public sealed class ChartsStartup : StartupBase
{
    public override void ConfigureServices(IServiceCollection services)
    {
        services.AddContentPart<InterviewDataWithDefinedRangePart>()
                .UseDisplayDriver<InterviewDataWithDefinedRangePartDisplayDriver>();

        services.TryAddScoped<InterviewDataProvider>();

        services.AddDataMigration<InterviewDataChartMigrations>();
    }
}

[RequireFeatures("OrchardCore.Workflows", "OrchardCore.Notifications")]
public sealed class WorkflowsStartup : StartupBase
{
    public override void ConfigureServices(IServiceCollection services)
    {
        services.AddActivity<InterviewBelowThresholdEvent, InterviewBelowThresholdEventDisplayDriver>();
        services.Configure<TemplateOptions>(o =>
        {
            o.MemberAccessStrategy.Register<ThresholdSummary>();
        });
        services.AddIndexProvider<InterviewBelowThresholdIndexProvider>();
        services.AddDataMigration<InterviewBelowThresholdIndexMigrations>();
    }
}

[RequireFeatures("OrchardCore.AdminDashboard")]
public sealed class SurveyThresholdWidget : StartupBase
{
    public override void ConfigureServices(IServiceCollection services)
    {
        services.AddContentPart<SurveyThresholdWidgetPart>()
                .UseDisplayDriver<SurveyThresholdWidgetDisplayDriver>();

        services.AddDataMigration<SurveyThresholdWidgetMigrations>();
    }
}
