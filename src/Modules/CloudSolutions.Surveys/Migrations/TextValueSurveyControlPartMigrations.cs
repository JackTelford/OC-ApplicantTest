using CloudSolutions.Surveys.Core;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.Data.Migration;
using OrchardCore.Title.Models;

namespace CloudSolutions.Surveys.Migrations;

public sealed class TextValueSurveyControlPartMigrations : DataMigration
{
    private readonly IContentDefinitionManager _contentDefinitionManager;

    public TextValueSurveyControlPartMigrations(IContentDefinitionManager contentDefinitionManager)
        => _contentDefinitionManager = contentDefinitionManager;

    public async Task<int> CreateAsync()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync(SurveyConstants.TextValueSurveyControlPartName, part => part
                .Attachable()
                .Reusable()
            );

        await _contentDefinitionManager.AlterTypeDefinitionAsync(SurveyConstants.TextValueSurveyControlType, type => type
            .DisplayedAs("Text Value")
            .WithPart(nameof(TitlePart), part => part
                .WithDescription("Title is optional. However when using multiple fields per question, setting a title grant the user explicit definition of the data being captured")
                .WithPosition("1")
                .WithSettings(new TitlePartSettings()
                {
                    Options = TitlePartOptions.Editable,
                }))
            .Stereotype("SurveyControl")
            .WithPart(SurveyConstants.TextValueSurveyControlPartName, part => part.WithPosition("10"))
        );

        return 1;
    }
}
