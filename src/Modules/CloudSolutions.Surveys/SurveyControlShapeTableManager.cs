using CloudSolutions.Surveys.Core;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.ContentManagement.Metadata.Models;
using OrchardCore.DisplayManagement.Descriptors;
using OrchardCore.Flows.ViewModels;

namespace CloudSolutions.Surveys;

public sealed class SurveyControlShapeTableManager : ShapeTableProvider
{
    public override ValueTask DiscoverAsync(ShapeTableBuilder builder)
    {
        builder.Describe("ContentPart_Edit")
            .OnDisplaying(displaying =>
            {
                dynamic shape = displaying.Shape;
                if (shape.ContentTypePartDefinition != null)
                {
                    string contentPartName = shape.ContentTypePartDefinition.Name;
                    displaying.Shape.Metadata.Alternates.Add($"ContentPart_Edit__{contentPartName}");
                }
            });

        builder.Describe("BagPart_Edit")
               .OnDisplaying(async displaying =>
                {
                    if (displaying.Shape is BagPartEditViewModel viewModel && viewModel.BagPart?.ContentItem?.ContentType == SurveyConstants.SurveyQuestionContentType)
                    {
                        var definitionManager = displaying.ServiceProvider.GetRequiredService<IContentDefinitionManager>();
                        viewModel.ContainedContentTypeDefinitions = (await definitionManager.ListTypeDefinitionsAsync())
                            .Where(t => t.StereotypeEquals("SurveyControl"));
                    }
                });

        return ValueTask.CompletedTask;
    }
}
