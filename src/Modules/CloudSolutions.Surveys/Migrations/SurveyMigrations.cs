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


public sealed class SurveyMigrations : DataMigration
{
    private readonly IContentDefinitionManager _contentDefinitionManager;

    public SurveyMigrations(IContentDefinitionManager contentDefinitionManager) => _contentDefinitionManager = contentDefinitionManager;

    public async Task<int> CreateAsync()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync(nameof(SurveyPart), part => part
            .WithField(nameof(SurveyPart.CompletedMessage), field => field
                .OfType(nameof(TextField))
                .WithDisplayName("Thank you message")
                .WithEditor("TextArea")
                .WithSettings(new TextFieldSettings()
                {
                    Required = true,
                    Hint = "Message to show after completing an interview",
                })
            )
            .WithField(nameof(SurveyPart.Description), field => field
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

        await _contentDefinitionManager.AlterTypeDefinitionAsync(SurveyConstants.SurveyContentType, type => type
                .Creatable(true)
                .Listable(true)
                .Draftable(true)
                .Versionable(false)
                .Securable(true)
                .DisplayedAs("Surveys")
                .WithPart(nameof(TitlePart), part => part
                    .WithPosition("1")
                    .WithSettings(new TitlePartSettings()
                    {
                        Options = TitlePartOptions.EditableRequired,
                    })
                )
                .WithPart(nameof(SurveyPart), part => part
                    .WithPosition("10"))

                .WithPart(SurveyConstants.Pages, nameof(BagPart), part => part
                    .WithPosition("20")
                    .WithDisplayName("Pages")
                    .WithDescription("Survey pages")
                    .WithSettings(new BagPartSettings()
                    {
                        ContainedContentTypes = [SurveyConstants.SurveyPageContentType],
                    }))
            );

        return 1;
    }

    public async Task<int> UpdateFrom1Async()
    {
        await _contentDefinitionManager.AlterTypeDefinitionAsync(SurveyConstants.SurveyContentType, type => type
            .WithPart(nameof(SurveyRestrictionPart), part => part.WithPosition("11"))
        );

        return 2;
    }

    public async Task<int> UpdateFrom2Async()
    {
        await _contentDefinitionManager.AlterTypeDefinitionAsync(SurveyConstants.SurveyContentType, type => type
            .WithPart(nameof(InterviewLinkPart), part => part.WithPosition("1"))
        );

        return 3;
    }

    public async Task<int> UpdateFrom3Async()
    {
        await _contentDefinitionManager.AlterTypeDefinitionAsync(SurveyConstants.SurveyContentType, type => type
            .WithPart(nameof(AnonymousSurveyPart), part => part.WithPosition("12"))
        );

        return 4;
    }

    public async Task<int> UpdateFrom4Async()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync(nameof(SurveyPart), part => part
            .RemoveField(nameof(SurveyPart.Description))
        );

        return 5;
    }

    public async Task<int> UpdateFrom5Async()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync(nameof(SurveyPart), part => part
            .WithField(nameof(SurveyPart.Description), field => field
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

        return 6;
    }
}
