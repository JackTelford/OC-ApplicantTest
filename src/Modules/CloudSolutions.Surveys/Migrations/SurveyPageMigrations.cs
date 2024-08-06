using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models;
using OrchardCore.ContentFields.Fields;
using OrchardCore.ContentFields.Settings;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.Data.Migration;
using OrchardCore.Flows.Models;
using OrchardCore.Title.Models;

namespace CloudSolutions.Surveys.Migrations;

public sealed class SurveyPageMigrations : DataMigration
{
    private readonly IContentDefinitionManager _contentDefinitionManager;

    public SurveyPageMigrations(IContentDefinitionManager contentDefinitionManager) => _contentDefinitionManager = contentDefinitionManager;

    public async Task<int> CreateAsync()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync(nameof(SurveyPagePart), part => part
            .WithField(nameof(SurveyPagePart.Description), field => field
                .OfType(nameof(HtmlField))
                .WithDisplayName("Description")
                .WithEditor("Trumbowyg")
                .WithSettings(new HtmlFieldSettings()
                {
                    SanitizeHtml = false,
                    Hint = "Optionally, add any notes you like to add to this survey",
                })
            )
        );

        await _contentDefinitionManager.AlterTypeDefinitionAsync(SurveyConstants.SurveyPageContentType, type => type
                .Creatable(false)
                .Listable(false)
                .Draftable(false)
                .Versionable(false)
                .DisplayedAs("Survey Pages")
                .WithPart(nameof(TitlePart), part => part
                    .WithPosition("1")
                    .WithSettings(new TitlePartSettings()
                    {
                        Options = TitlePartOptions.EditableRequired,
                    })
                )
                .WithPart(nameof(SurveyPagePart), part => part
                    .WithPosition("10"))

                .WithPart(SurveyConstants.Questions, nameof(BagPart), part => part
                    .WithPosition("20")
                    .WithDisplayName("Questions")
                    .WithDescription("Page questions")
                    .WithSettings(new BagPartSettings()
                    {
                        ContainedContentTypes = [SurveyConstants.SurveyQuestionContentType],
                    }))
            );

        return 1;
    }

    public async Task<int> UpdateFrom1Async()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync(nameof(SurveyPagePart), part => part
            .RemoveField(nameof(SurveyPart.Description))
        );

        return 2;
    }

    public async Task<int> UpdateFrom2Async()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync(nameof(SurveyPagePart), part => part
            .WithField(nameof(SurveyPagePart.Description), field => field
                .OfType(nameof(HtmlField))
                .WithDisplayName("Description")
                .WithEditor("Trumbowyg")
                .WithSettings(new HtmlFieldSettings()
                {
                    SanitizeHtml = false,
                    Hint = "Optionally, add any notes you like to add to this survey",
                })
            )
        );

        return 3;
    }
}
