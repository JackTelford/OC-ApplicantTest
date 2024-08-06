using OrchardCore.Security.Permissions;

namespace CloudSolutions.Surveys;

public static class SurveyPermissions
{
    public static readonly Permission CompleteInterview = new("CompleteInterview", "Complete Interview");
}
