using CloudSolutions.Charts.Models;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.Data.Migration;
using OrchardCore.Title.Models;

namespace CloudSolutions.Surveys.Migrations;

public sealed class InterviewDataChartMigrations : DataMigration
{
    private readonly IContentDefinitionManager _contentDefinitionManager;

    public InterviewDataChartMigrations(IContentDefinitionManager contentDefinitionManager) => _contentDefinitionManager = contentDefinitionManager;

    public async Task<int> CreateAsync()
    {
        await _contentDefinitionManager.AlterTypeDefinitionAsync(SurveyConstants.InterviewDataChart, type => type
                .Creatable(false)
                .Listable(false)
                .Draftable(false)
                .Versionable(false)
                .Securable(true)
                .Stereotype("Widget")
                .WithPart(nameof(ChartInfoPart))
                .WithPart(nameof(InterviewDataWithDefinedRangePart))
            );

        return 1;
    }

    public async Task<int> UpdateFrom1Async()
    {
        await _contentDefinitionManager.AlterTypeDefinitionAsync(SurveyConstants.InterviewDataChart, type => type
                .Creatable(false)
                .Listable(false)
                .Draftable(false)
                .Versionable(false)
                .Securable(true)
                .Stereotype("Widget")
                .WithPart(nameof(ChartInfoPart))
                .WithPart(nameof(InterviewDataWithDefinedRangePart))
                .RemovePart(nameof(TitlePart))
            );

        return 2;
    }

}
