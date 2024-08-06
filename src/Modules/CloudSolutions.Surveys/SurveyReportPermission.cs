using OrchardCore.Security.Permissions;

namespace CloudSolutions.Surveys;

public static class SurveyReportPermission
{
    public static readonly Permission RunInterviewDataReport = new(nameof(RunInterviewDataReport), "Run Interview Data Report");

    public static readonly Permission RunInterviewDataReportByTeam = new(nameof(RunInterviewDataReportByTeam), "Run Interview Data Report by Team");

    public static readonly Permission ManageReportSettings = new("ManageReportSettings", "Manage report settings");
}
