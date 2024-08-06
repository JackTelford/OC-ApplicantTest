using System.Text.Json.Serialization;
using OrchardCore.ContentFields.Settings;

namespace CloudSolutions.Surveys.Core.Models;

public sealed class ListControlValueOption : ListValueOption
{
    [JsonPropertyName("weight")]
    public double? Weight { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; }

    [JsonPropertyName("backgroundColor")]
    public string BackgroundColor { get; set; }

    [JsonPropertyName("fontColor")]
    public string FontColor { get; set; }
}
