using Microsoft.Extensions.Localization;

namespace CloudSolutions.Surveys.Models;

public sealed class CanStartResult
{
    public bool Allow { get; set; }

    public LocalizedString Error { get; set; }

    public static readonly CanStartResult Success = new()
    {
        Allow = true,
    };

    public static CanStartResult Fail(LocalizedString message)
        => new()
        {
            Allow = false,
            Error = message,
        };
}
