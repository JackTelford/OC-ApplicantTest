using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models;
using OrchardCore.ContentFields.Fields;
using OrchardCore.ContentFields.Settings;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.Data.Migration;
using OrchardCore.Title.Models;

namespace CloudSolutions.Surveys.Migrations;

public sealed class SurveyQuestionMigrations : DataMigration
{
    private readonly IContentDefinitionManager _contentDefinitionManager;

    public SurveyQuestionMigrations(IContentDefinitionManager contentDefinitionManager) => _contentDefinitionManager = contentDefinitionManager;

    public async Task<int> CreateAsync()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync(nameof(SurveyQuestionPart), part => part
            .WithField(nameof(SurveyQuestionPart.Description), field => field
                .OfType(nameof(HtmlField))
                .WithDisplayName("Description")
                .WithEditor("Trumbowyg")
                .WithSettings(new HtmlFieldSettings()
                {
                    SanitizeHtml = false,
                    Hint = "Optionally, add any description you like to add to this question",
                })
            )
        );

        await _contentDefinitionManager.AlterTypeDefinitionAsync(SurveyConstants.SurveyQuestionContentType, type => type
                .Creatable(false)
                .Listable(false)
                .Draftable(false)
                .Versionable(false)
                .DisplayedAs("Survey Questions")
                .WithPart(nameof(TitlePart), part => part
                    .WithPosition("1")
                    .WithSettings(new TitlePartSettings()
                    {
                        Options = TitlePartOptions.EditableRequired,
                    })
                )
                .WithPart(nameof(SurveyQuestionPart), part => part
                    .WithPosition("10")
                )
            );

        return 1;
    }

    public async Task<int> UpdateFrom1Async()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync(nameof(SurveyQuestionPart), part => part
            .RemoveField(nameof(SurveyQuestionPart.Description))
        );

        return 2;
    }

    public async Task<int> UpdateFrom2Async()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync(nameof(SurveyQuestionPart), part => part
            .WithField(nameof(SurveyQuestionPart.Description), field => field
                .OfType(nameof(HtmlField))
                .WithDisplayName("Description")
                .WithEditor("Trumbowyg")
                .WithSettings(new HtmlFieldSettings()
                {
                    SanitizeHtml = false,
                    Hint = "Optionally, add any description you like to add to this question",
                })
            )
        );

        return 3;
    }
}
