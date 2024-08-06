namespace CloudSolutions.Surveys.ViewModels;

public class PredefinedListSurveyControlPartMetadataViewModel : SurveyControlPartMetadataViewModel
{
    public bool Multiple { get; set; }

    public int? MinLength { get; set; }

    public int? MaxLength { get; set; }

    public double? Threshold { get; set; }
}
