namespace CloudSolutions.Surveys.Models;

public sealed class ReportParameterSettings
{
    public string Title { get; set; }

    public string Description { get; set; }

    public ReportType Type { get; set; }

    public ReportParameterTypes Range { get; set; }

    public string Owner { get; set; }

    public DateTime? From { get; set; }

    public DateTime? To { get; set; }

    public string SurveyId { get; set; }

    public string TeamId { get; set; }

    public string IntervieweeId { get; set; }

    public string Id { get; set; }

    public bool ShowOnNavbar { get; set; }

    public string[] RoleNames { get; set; } = [];
}
