using System.Globalization;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.ViewModels;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Mvc.ModelBinding;

namespace CloudSolutions.Surveys.Drivers;

public class NumericValueSurveyControlPartDisplayDriver : SurveyControlPartDisplayDriver<NumericValueSurveyControlPart>
{
    protected readonly IStringLocalizer S;

    public NumericValueSurveyControlPartDisplayDriver(
        IStringLocalizer<NumericValueSurveyControlPartDisplayDriver> stringLocalizer)
    {
        S = stringLocalizer;
    }

    public virtual double? GetAverage(NumericValueSurveyControlPart part, BuildPartDisplayContext context)
    {
        return null;
    }

    public virtual double? GetSum(NumericValueSurveyControlPart part, BuildPartDisplayContext context)
    {
        return null;
    }

    public override Task<IDisplayResult> DisplayAsync(NumericValueSurveyControlPart part, BuildPartDisplayContext context)
    {
        if (context.GroupId == SurveyConstants.Report)
        {
            var metadata = part.ContentItem.As<NumericValueSurveyControlPartMetadata>() ?? new NumericValueSurveyControlPartMetadata();

            var contentShape = Initialize<TableCellViewModel>("TableCell", vm =>
            {
                vm.Values = [part.Value?.ToString(metadata.Format, CultureInfo.InvariantCulture)];
            }).Location("Content").OnGroup(context.GroupId);

            var avg = GetAverage(part, context);
            var sum = GetSum(part, context);

            var avgShape = Initialize<TableCellCalculations>(nameof(TableCellCalculations), vm =>
            {
                vm.Value = (double?)part.Value;
            }).Location("Average").OnGroup(context.GroupId);

            var sumShape = Initialize<TableCellCalculations>(nameof(TableCellCalculations), vm =>
            {
                vm.Value = (double?)part.Value;
            }).Location("Sum").OnGroup(context.GroupId);

            return Task.FromResult<IDisplayResult>(Combine(contentShape, avgShape, sumShape));
        }

        return Task.FromResult<IDisplayResult>(null);
    }

    public override Task<IDisplayResult> InterviewEditAsync(NumericValueSurveyControlPart part, BuildPartEditorContext context)
    {
        // build editor for interview
        var metadata = part.ContentItem.As<NumericValueSurveyControlPartMetadata>() ?? new NumericValueSurveyControlPartMetadata();
        // we may need to get the titlePart and the Description part here...
        var shapeResult = Initialize<NumericValueSurveyControlInterviewViewModel>("NumericValueSurveyControlInterview_Edit", vm =>
        {
            vm.Description = part.Description;
            vm.IsRequired = metadata.IsRequired;
            vm.Title = part.ContentItem.DisplayText;
            vm.Scale = metadata.Scale;
            vm.Hint = metadata.Hint;
            vm.Value = part.Value;
        }).Location("Content:1").OnGroup(context.GroupId);

        return Task.FromResult<IDisplayResult>(shapeResult);
    }

    public override async Task<IDisplayResult> InterviewUpdateAsync(NumericValueSurveyControlPart part, IUpdateModel updater, BuildPartEditorContext context)
    {
        var vm = new NumericValueSurveyControlPart();

        // doing interview validation
        var metadataPart = part.ContentItem.As<NumericValueSurveyControlPartMetadata>();

        await updater.TryUpdateModelAsync(vm, Prefix);

        // get the select values that are in the metadata options!

        if (metadataPart.IsRequired && !vm.Value.HasValue)
        {
            updater.ModelState.AddModelError(Prefix, nameof(NumericValueSurveyControlPart.Value), S["The field is required"]);
        }

        if (metadataPart.MinValue.HasValue && metadataPart.MinValue.Value > vm.Value)
        {
            updater.ModelState.AddModelError(Prefix, nameof(NumericValueSurveyControlPart.Value), S["The minimum value allowed is {0}", metadataPart.MinValue]);
        }

        if (metadataPart.MaxValue.HasValue && metadataPart.MaxValue.Value < vm.Value)
        {
            updater.ModelState.AddModelError(Prefix, nameof(NumericValueSurveyControlPart.Value), S["The maximum value allowed is {0}", metadataPart.MaxValue]);
        }

        part.Value = vm.Value;

        return await InterviewEditAsync(part, context);
    }

    public override Task<IDisplayResult> AdminEditAsync(NumericValueSurveyControlPart part, BuildPartEditorContext context)
    {
        var metadataPart = part.ContentItem.As<NumericValueSurveyControlPartMetadata>() ?? new NumericValueSurveyControlPartMetadata();

        var metadataShape = Initialize<NumericValueSurveyControlPartMetadataViewModel>("NumericValueSurveyControlPartMetadata_Edit", vm =>
        {
            vm.Description = part.Description;
            vm.Hint = metadataPart.Hint;
            vm.IsRequired = metadataPart.IsRequired;
            vm.MinValue = metadataPart.MinValue;
            vm.MaxValue = metadataPart.MaxValue;
            vm.Format = metadataPart.Format;
            vm.FormatOptions = GetFormats();
        }).Location("Parts:15")
        .OnGroup(context.GroupId);

        return Task.FromResult<IDisplayResult>(metadataShape);
    }

    public override async Task<IDisplayResult> AdminUpdateAsync(NumericValueSurveyControlPart part, IUpdateModel updater, UpdatePartEditorContext context)
    {
        part.ContentItem.Weld<SurveyControlPartMetadata>();
        part.ContentItem.Weld<NumericValueSurveyControlPartMetadata>();

        var metadataVm = new NumericValueSurveyControlPartMetadataViewModel();

        await updater.TryUpdateModelAsync(metadataVm, Prefix);

        var formatItem = GetFormats().OrderBy(x => x.Value == metadataVm.Format ? 0 : 1).First();

        part.ContentItem.Alter<NumericValueSurveyControlPartMetadata>(metadata =>
        {
            metadata.Description = metadataVm.Description;
            metadata.IsRequired = metadataVm.IsRequired;
            metadata.Hint = metadataVm.Hint;

            metadata.MinValue = metadataVm.MinValue;
            metadata.MaxValue = metadataVm.MaxValue;
            // make sure the provided value is valid

            metadata.Format = formatItem.Value;
            metadata.Scale = formatItem.Value switch
            {
                "N1" => 1,
                "C" => 2,
                "N2" => 2,
                "N3" => 3,
                "N4" => 4,
                _ => 0
            };
        });

        return await AdminEditAsync(part, context);
    }

    private IEnumerable<SelectListItem> GetFormats()
        =>
        [
            new(S["No decimals"], "N"),
            new(S["1 decimal"], "N1"),
            new(S["2 decimals"], "N2"),
            new(S["3 decimals"], "N3"),
            new(S["4 decimals"], "N4"),
            new(S["Currency"], "C"),
        ];
}
