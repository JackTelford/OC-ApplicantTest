using OrchardCore;
using OrchardCore.Security.Permissions;

namespace CloudSolutions.Surveys;

public sealed class SurveyPermissionsProvider : IPermissionProvider
{
    public IEnumerable<PermissionStereotype> GetDefaultStereotypes() =>
    [
        new PermissionStereotype
        {
            Name = OrchardCoreConstants.Roles.Administrator,
            Permissions = _allPermissions,
        },
    ];

    public Task<IEnumerable<Permission>> GetPermissionsAsync() =>
        Task.FromResult(_allPermissions);

    private readonly IEnumerable<Permission> _allPermissions =
    [
        SurveyPermissions.CompleteInterview,
    ];
}
