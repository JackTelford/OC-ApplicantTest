using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CloudSolutions.Surveys.ViewModels;

public class InterviewDataWithDefinedRangePartViewModel
{
    // public bool PullDataFromLatestVersion { get; set; }

    [Required]
    public string SurveyVersionId { get; set; }

    // public string SurveyId { get; set; }

    [Required, MinLength(1)]
    public string[] InputIds { get; set; }

    public string Range { get; set; }

    public string DataSource { get; set; }

    public string[] Teams { get; set; }

    public static SelectListItem[] RangeOptions =>
    [
        new SelectListItem("Current Week", "current-week"),
        new SelectListItem("2 Weeks", "2-weeks" ),
        new SelectListItem("4 Weeks", "4-weeks" ),
        new SelectListItem("6 Weeks", "6-weeks" ),
    ];

    private static readonly string _loggedUserAccessibleTeamData = "logged-user-accessible-team-data";
    private static readonly string _specificTeamValue = "specific-teams-when-accessible";

    public static SelectListItem[] DataSourceOptions =>
    [
        new SelectListItem("Logged user's data only", "logged-user"),
        new SelectListItem("Logged user's current team data only", "logged-user-current-team"),
        new SelectListItem("Logged user's accessible team's data", _loggedUserAccessibleTeamData),
        new SelectListItem("Specific Teams when accessible",  _specificTeamValue),
    ];

    public bool IsSpecificTeams()
        => IsSpecificTeams(DataSource);

    public static bool IsSpecificTeams(string dataSource)
        => dataSource != null && _specificTeamValue.Equals(dataSource, StringComparison.Ordinal);

    public static bool ShowTeamSelection(string dataSource)
        => IsSpecificTeams(dataSource) || IsAccessibleTeamData(dataSource);

    public static bool IsAccessibleTeamData(string dataSource)
        => _loggedUserAccessibleTeamData.Equals(dataSource, StringComparison.Ordinal);
}
