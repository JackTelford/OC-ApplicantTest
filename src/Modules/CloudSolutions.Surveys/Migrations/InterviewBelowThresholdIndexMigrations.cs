using CloudSolutions.Surveys.Indexes;
using OrchardCore.Data.Migration;
using YesSql.Sql;

namespace CloudSolutions.Surveys.Migrations;

public sealed class InterviewBelowThresholdIndexMigrations : DataMigration
{
    public async Task<int> CreateAsync()
    {
        await SchemaBuilder.CreateMapIndexTableAsync<InterviewBelowThresholdIndex>(table =>
        {
            table.Column<string>("SurveyContentItemId", column => column.NotNull().WithLength(26));
            table.Column<string>("InterviewId", column => column.NotNull().WithLength(26));
            table.Column<DateTime>("InterviewedAt", column => column.Nullable());
            table.Column<string>("UserId", column => column.NotNull().WithLength(26));
            table.Column<double>("Threshold", column => column.Nullable());
            table.Column<double>("Response", column => column.Nullable());
            table.Column<string>("SurveyVersionId", column => column.WithLength(26));
            table.Column<string>("Title", column => column.WithLength(500));
        });

        await SchemaBuilder.AlterIndexTableAsync<InterviewBelowThresholdIndex>(table => table
            .CreateIndex("IDX_InterviewBelowThresholdIndex_DocumentId",
                "DocumentId",
                "SurveyContentItemId",
                "InterviewId",
                "InterviewedAt",
                "UserId",
                "Threshold")
        );

        return 1;
    }
}
