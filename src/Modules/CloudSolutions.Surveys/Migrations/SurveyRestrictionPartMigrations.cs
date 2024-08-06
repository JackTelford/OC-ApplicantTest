using OrchardCore.ContentFields.Fields;
using OrchardCore.ContentFields.Settings;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.Data.Migration;

namespace CloudSolutions.Surveys.Migrations;

public sealed class SurveyRestrictionPartMigrations : DataMigration
{
    private readonly IContentDefinitionManager _contentDefinitionManager;

    public SurveyRestrictionPartMigrations(IContentDefinitionManager contentDefinitionManager) => _contentDefinitionManager = contentDefinitionManager;

    public async Task<int> CreateAsync()
    {
        await _contentDefinitionManager.AlterPartDefinitionAsync("SurveyRestrictionPart", part => part
           .WithField<BooleanField>("EnableDailyLimit", field => field
               .WithDisplayName("Enable Daily Limit")
               .MergeSettings<BooleanFieldSettings>(settings =>
               {
                   settings.DefaultValue = false;
                   settings.Hint = "Prevent the same user from completing X amount of interviews per day";
               })
           )
           .WithField<NumericField>("MaxDailyAllowed", field => field
               .WithDisplayName("Maximum interviews allowed per day")
               .MergeSettings<NumericFieldSettings>(settings =>
               {
                   settings.DefaultValue = null;
                   settings.Minimum = 0;
                   settings.Hint = "The maximum interviews a user is allowed to complete per day";
               })
           )
           .WithField<BooleanField>("EnableWeeklyLimit", field => field
               .WithDisplayName("Enable Weekly Limit")
               .MergeSettings<BooleanFieldSettings>(settings =>
               {
                   settings.DefaultValue = false;
                   settings.Hint = "Prevent the same user from completing X amount of interviews per week";
               })
           )
           .WithField<NumericField>("MaxWeeklyAllowed", field => field
               .WithDisplayName("Maximum interviews allowed per week")
               .MergeSettings<NumericFieldSettings>(settings =>
               {
                   settings.DefaultValue = null;
                   settings.Minimum = 0;
                   settings.Hint = "The maximum interviews a user is allowed to complete per week";
               })
           )
       );

        return 2;
    }
}
