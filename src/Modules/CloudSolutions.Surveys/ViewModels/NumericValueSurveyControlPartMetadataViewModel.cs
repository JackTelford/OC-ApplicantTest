using Microsoft.AspNetCore.Mvc.Rendering;

namespace CloudSolutions.Surveys.ViewModels;

public class NumericValueSurveyControlPartMetadataViewModel : SurveyControlPartMetadataViewModel
{
    public decimal? MinValue { get; set; }

    public decimal? MaxValue { get; set; }

    public int Scale { get; set; }

    public string Format { get; set; }

    public IEnumerable<SelectListItem> FormatOptions { get; set; }
}

public class TextValueSurveyControlPartMetadataViewModel : SurveyControlPartMetadataViewModel
{
    public int? MinLength { get; set; }

    public int? MaxLength { get; set; }

    public string Editor { get; set; }

    public IEnumerable<SelectListItem> EditorOptions { get; set; }
}
