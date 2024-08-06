using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core.Models;

public sealed class InterviewDataWithDefinedRangePart : ContentPart
{
    public string SurveyVersionId { get; set; }

    public string[] InputIds { get; set; }

    public string Range { get; set; }

    public string DataSource { get; set; }

    public string[] TeamIds { get; set; }
}
