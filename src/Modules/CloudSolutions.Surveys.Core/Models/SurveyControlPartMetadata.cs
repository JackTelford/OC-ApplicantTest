using System.ComponentModel;
using OrchardCore.ContentManagement;

namespace CloudSolutions.Surveys.Core.Models;

public class SurveyControlPartMetadata : ContentPart
{
    [DefaultValue(true)]
    public bool Aggregable { get; set; } = true;

    public bool IsRequired { get; set; }

    public string Description { get; set; }

    public string Hint { get; set; }
}
