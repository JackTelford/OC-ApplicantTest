using CrestApps.Support;

namespace CloudSolutions.Surveys.ViewModels;

public sealed class UserInfo
{
    public string UserId { get; set; }

    public string Username { get; set; }

    public string FirstName { get; set; }

    public string MiddleName { get; set; }

    public string LastName { get; set; }

    public string FullName => Str.Merge(FirstName, MiddleName, LastName);
}
