using OrchardCore.ContentFields.Fields;
using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core.Models;

public sealed class SurveyRestrictionPart : ContentPart
{
    public BooleanField EnableDailyLimit { get; set; }

    public NumericField MaxDailyAllowed { get; set; }

    public BooleanField EnableWeeklyLimit { get; set; }

    public NumericField MaxWeeklyAllowed { get; set; }

    public bool EnableDailyRestriction { get; set; }

    public Dictionary<DayOfWeek, DailyRestriction> DailyRestrictions { get; set; }
}

public sealed class DailyRestriction
{
    public DailyRestrictionType Type { get; set; }

    public TimeSpan? From { get; set; }

    public TimeSpan? To { get; set; }
}

public enum DailyRestrictionType
{
    AllowAll,
    PreventAll,
    LimitTime,
}
