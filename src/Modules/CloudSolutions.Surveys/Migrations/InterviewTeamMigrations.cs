using CloudSolutions.Surveys.Core.Indexes;
using OrchardCore.Data.Migration;
using YesSql.Sql;

namespace CloudSolutions.Surveys.Migrations;

public sealed class InterviewTeamMigrations : DataMigration
{
    public async Task<int> CreateAsync()
    {
        await SchemaBuilder.CreateMapIndexTableAsync<InterviewTeamIndex>(table => table
            .Column<string>("InterviewId", column => column.NotNull().WithLength(26))
            .Column<string>("TeamId", column => column.NotNull().WithLength(26))
        );

        await SchemaBuilder.AlterIndexTableAsync<InterviewTeamIndex>(table => table
            .CreateIndex("IDX_InterviewTeamIndex_DocumentId",
                "DocumentId",
                "TeamId",
                "InterviewId")
        );

        // Skip 2 for new setup
        return 2;
    }

    public async Task<int> UpdateFrom1Async()
    {
        await SchemaBuilder.AlterIndexTableAsync<InterviewTeamIndex>(table => table
            .CreateIndex("IDX_InterviewTeamIndex_DocumentId",
                "DocumentId",
                "TeamId",
                "InterviewId")
        );

        return 2;
    }
}
