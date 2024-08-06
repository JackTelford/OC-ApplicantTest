using CloudSolutions.Surveys.Core;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.Data.Migration;
using OrchardCore.Modules;

namespace CloudSolutions.Surveys.Migrations;

public sealed class SurveyThresholdWidgetMigrations : DataMigration
{
    private readonly IContentDefinitionManager _contentDefinitionManager;

    public SurveyThresholdWidgetMigrations(IContentDefinitionManager contentDefinitionManager)
    {
        _contentDefinitionManager = contentDefinitionManager;
    }

    public async Task<int> CreateAsync()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync(SurveyConstants.SurveyThresholdWidgetPart, part => part
        .Attachable()
        .WithDescription("Survey threshold")
        );

        await _contentDefinitionManager.AlterTypeDefinitionAsync(SurveyConstants.SurveyThresholdWidget, type => type
        .Stereotype("DashboardWidget")
        .WithPart("DashboardPart")
        .WithPart("SurveyThresholdWidgetPart")
        );

        return 1;
    }
}
