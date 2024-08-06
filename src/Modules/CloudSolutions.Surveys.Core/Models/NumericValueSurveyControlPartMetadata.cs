namespace CloudSolutions.Surveys.Core.Models;

public class NumericValueSurveyControlPartMetadata : SurveyControlPartMetadata
{
    public decimal? MinValue { get; set; }

    public decimal? MaxValue { get; set; }

    public int Scale { get; set; }

    public string Format { get; set; }

    public void SetCurrency()
    {
        Format = "C";
        Scale = 2;
    }

    public void SetByScare(int scale)
    {
        Scale = scale < 0 ? 0 : scale;
        Format = $"N:{Scale}";
    }
}

public class TextValueSurveyControlPartMetadata : SurveyControlPartMetadata
{
    public int? MinLength { get; set; }

    public int? MaxLength { get; set; }

    public string Editor { get; set; }
}
