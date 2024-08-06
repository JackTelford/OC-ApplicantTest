namespace CloudSolutions.Surveys.ViewModels;

public class NumericValueSurveyControlInterviewViewModel : SurveyControlInterviewViewModel
{
    public decimal? Value { get; set; }

    public int Scale { get; set; }
}

public class TextValueSurveyControlInterviewViewModel : SurveyControlInterviewViewModel
{
    public string Text { get; set; }

    public string Editor { get; set; }
}
