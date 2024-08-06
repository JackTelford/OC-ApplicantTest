using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.Models;

namespace CloudSolutions.Surveys.Core;

public interface IWeightContentProvider<TPart> where TPart : ContentPart
{
    public Task<double?> AverageAsync(TPart part, BuildPartDisplayContext context);

    public Task<double?> SumAsync(TPart part, BuildPartDisplayContext context);

}
