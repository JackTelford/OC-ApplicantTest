using OrchardCore.ContentFields.Settings;

namespace CloudSolutions.Surveys.Core.Models;

public class PredefinedListSurveyControlPartMetadata : SurveyControlPartMetadata
{
    public EditorOption Editor { get; set; }

    public bool Multiple { get; set; }

    public int? MinLength { get; set; }

    public int? MaxLength { get; set; }

    public double? Threshold { get; set; }

    public ListControlValueOption[] Options { get; set; }
}
