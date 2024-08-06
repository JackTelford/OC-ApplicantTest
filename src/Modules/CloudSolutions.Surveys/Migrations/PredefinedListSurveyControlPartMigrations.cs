using CloudSolutions.Surveys.Core;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.Data.Migration;
using OrchardCore.Title.Models;

namespace CloudSolutions.Surveys.Migrations;

public sealed class PredefinedListSurveyControlPartMigrations : DataMigration
{
    private readonly IContentDefinitionManager _contentDefinitionManager;

    public PredefinedListSurveyControlPartMigrations(IContentDefinitionManager contentDefinitionManager) => _contentDefinitionManager = contentDefinitionManager;

    public async Task<int> CreateAsync()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync(SurveyConstants.PredefinedListSurveyControlPartName, part => part
                .Attachable()
                .Reusable()
            );

        await _contentDefinitionManager.AlterTypeDefinitionAsync(SurveyConstants.PredefinedListSurveyControl, type => type
            .DisplayedAs("Predefined List")
            .WithPart(nameof(TitlePart), part => part
                .WithDescription("Title is optional. However when using multiple fields per question, setting a title grant the user explicit definition of the data being captured")
                .WithSettings(new TitlePartSettings()
                {
                    Options = TitlePartOptions.Editable,
                }))
            .Stereotype("SurveyControl")
            .WithPart(nameof(TitlePart))
            .WithPart(SurveyConstants.PredefinedListSurveyControlPartName)

        );

        return 1;
    }
}
