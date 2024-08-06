using OrchardCore.Data.Documents;

namespace CloudSolutions.Surveys.Models;

public sealed class ReportParametersDocument : Document
{
    public Dictionary<string, ReportParameterSettings> Settings { get; set; } = [];
}
