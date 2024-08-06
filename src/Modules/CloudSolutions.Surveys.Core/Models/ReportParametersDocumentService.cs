using Microsoft.Extensions.DependencyInjection;
using OrchardCore.Documents;
using OrchardCore.Environment.Shell.Scope;

namespace CloudSolutions.Surveys.Models;

public sealed class ReportParametersDocumentService
{
    public Task<ReportParametersDocument> LoadDocumentAsync()
        => DocumentManager.GetOrCreateMutableAsync();

    /// <summary>
    /// Gets the index settings document from the cache for sharing and that should not be updated.
    /// </summary>
    public async Task<ReportParametersDocument> GetDocumentAsync()
    {
        var document = await DocumentManager.GetOrCreateImmutableAsync();

        return document;
    }

    public async Task<IEnumerable<ReportParameterSettings>> GetAllAsync()
    {
        var document = await GetDocumentAsync();

        return document.Settings.Values;
    }

    public async Task<ReportParameterSettings> GetAsync(string id)
    {
        var document = await GetDocumentAsync();

        if (document.Settings.TryGetValue(id, out var settings))
        {
            return settings;
        }

        return null;
    }

    public async Task UpdateAsync(ReportParameterSettings settings)
    {
        var document = await LoadDocumentAsync();
        document.Settings[settings.Id] = settings;
        await DocumentManager.UpdateAsync(document);
    }

    public async Task DeleteAsync(string id)
    {
        var document = await LoadDocumentAsync();
        document.Settings.Remove(id);
        await DocumentManager.UpdateAsync(document);
    }

    private static IDocumentManager<ReportParametersDocument> DocumentManager =>
        ShellScope.Services.GetRequiredService<IDocumentManager<ReportParametersDocument>>();
}
