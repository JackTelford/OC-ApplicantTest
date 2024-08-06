using OrchardCore.ContentFields.Fields;
using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core.Models;

public sealed class InterviewPart : ContentPart
{
    public TextField Status { get; set; }

    public ContentPickerField SurveyVersion { get; set; }

    public ContentPickerField Page { get; set; }
}
