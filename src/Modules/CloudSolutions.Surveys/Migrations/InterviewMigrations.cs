using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Indexes;
using CloudSolutions.Surveys.Core.Models;
using OrchardCore.ContentFields.Fields;
using OrchardCore.ContentFields.Settings;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.Data.Migration;
using YesSql.Sql;

namespace CloudSolutions.Surveys.Migrations;


public sealed class InterviewMigrations : DataMigration
{
    private readonly IContentDefinitionManager _contentDefinitionManager;

    public InterviewMigrations(IContentDefinitionManager contentDefinitionManager) => _contentDefinitionManager = contentDefinitionManager;

    public async Task<int> CreateAsync()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync(nameof(InterviewPart), part => part
            .WithField(nameof(InterviewPart.Status), field => field
                .OfType(nameof(TextField))
                .WithDisplayName("Status")
                .WithEditor("PredefinedList")
                .MergeSettings<TextFieldPredefinedListEditorSettings>(settings =>
                {
                    settings.Editor = EditorOption.Dropdown;
                    settings.DefaultValue = SurveyConstants.Pending;
                    settings.Options =
                    [
                        new ListValueOption()
                        {
                            Name = SurveyConstants.Terminated,
                            Value = SurveyConstants.Terminated,
                        },
                        new ListValueOption()
                        {
                            Name = SurveyConstants.Completed,
                            Value = SurveyConstants.Completed,
                        }
                    ];
                })
            )
            .WithField(nameof(InterviewPart.SurveyVersion), field => field
                .OfType(nameof(ContentPickerField))
                .WithDisplayName("Survey")
                .MergeSettings<ContentPickerFieldSettings>(settings =>
                {
                    settings.DisplayedContentTypes = [SurveyConstants.SurveyContentType];
                })
            )
            .WithField(nameof(InterviewPart.Page), field => field
                .OfType(nameof(ContentPickerField))
                .WithDisplayName("Page")
                .MergeSettings<ContentPickerFieldSettings>(settings =>
                {
                    settings.DisplayedContentTypes = [SurveyConstants.SurveyPageContentType];
                })
            )
        );

        await _contentDefinitionManager.AlterTypeDefinitionAsync(SurveyConstants.InterviewContentType, type => type
                .Creatable(false)
                .Listable(false)
                .Draftable(false)
                .Versionable(false)
                .DisplayedAs("Interviews")
            );

        await SchemaBuilder.CreateMapIndexTableAsync<InterviewIndex>(table =>
        {
            table.Column<string>("InterviewId", column => column.NotNull().WithLength(26));
            table.Column<string>("SurveyVersionId", column => column.NotNull().WithLength(26));
            table.Column<string>("SurveyContentItemId", column => column.NotNull().WithLength(26));
            table.Column<string>("PageId", column => column.NotNull().WithLength(26));
            table.Column<string>("Status", column => column.NotNull().WithLength(50));
            table.Column<string>("IntervieweeId", column => column.WithLength(26));
            table.Column<DateTime>("InterviewedAt", column => column.NotNull());
        });

        await SchemaBuilder.AlterIndexTableAsync<InterviewIndex>(table => table
            .CreateIndex("IDX_InterviewIndex_DocumentId",
                "DocumentId",
                "SurveyVersionId",
                "InterviewedAt",
                "Status")
        );

        // short cut to 3 since we no longer use TeamId column
        return 3;
    }


    public async Task<int> UpdateFrom1Async()
    {
        await SchemaBuilder.AlterIndexTableAsync<InterviewIndex>(table =>
        {
            table.DropColumn("TeamId");
        });

        return 2;
    }

    public async Task<int> UpdateFrom2Async()
    {
        await SchemaBuilder.AlterIndexTableAsync<InterviewIndex>(table => table
            .CreateIndex("IDX_InterviewIndex_DocumentId",
                "DocumentId",
                "SurveyVersionId",
                "InterviewedAt",
                "Status")
        );

        return 3;
    }
}
