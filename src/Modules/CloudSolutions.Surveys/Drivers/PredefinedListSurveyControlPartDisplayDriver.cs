using System.Text.Json;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.Core.Models.Reports;
using CloudSolutions.Surveys.ViewModels;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentFields.ViewModels;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Mvc.ModelBinding;

namespace CloudSolutions.Surveys.Drivers;

public class PredefinedListSurveyControlPartDisplayDriver : SurveyControlPartDisplayDriver<PredefinedListSurveyControlPart>
{
    protected readonly IStringLocalizer S;

    public PredefinedListSurveyControlPartDisplayDriver(IStringLocalizer<PredefinedListSurveyControlPartDisplayDriver> stringLocalizer)
    {
        S = stringLocalizer;
    }

    public virtual double? GetAverage(PredefinedListSurveyControlPart part, BuildPartDisplayContext context)
    {
        var values = GetWeights(part);

        if (!values.Any())
        {
            return null;
        }

        return values.Average();
    }

    public virtual double? GetSum(PredefinedListSurveyControlPart part, BuildPartDisplayContext context)
    {
        var values = GetWeights(part);

        if (!values.Any())
        {
            return null;
        }

        return values.Sum();
    }

    public override Task<IDisplayResult> DisplayAsync(PredefinedListSurveyControlPart part, BuildPartDisplayContext context)
    {
        if (context.GroupId == SurveyConstants.Report)
        {
            var contentShape = Initialize<TableCellViewModel>("TableCell", vm =>
            {
                PredefinedListSurveyControlPartMetadata metadata;

                var reportColumn = part.ContentItem.As<ReportColumn>();

                if (reportColumn != null && reportColumn.Input != null)
                {
                    metadata = reportColumn.Input.As<PredefinedListSurveyControlPartMetadata>();
                }
                else
                {
                    metadata = part.ContentItem.As<PredefinedListSurveyControlPartMetadata>();
                }

                var firstOption = metadata?.Options?.Where(x => part.Values != null && part.Values.Contains(x.Value))
                .OrderBy(x => x.Weight)
                .FirstOrDefault();

                if (firstOption != null)
                {
                    vm.BackgroundColor = firstOption.BackgroundColor;
                    vm.FontColor = firstOption.FontColor;
                }
                vm.Values = part.Values;
            }).Location("Content")
            .OnGroup(context.GroupId);

            var avgShape = Initialize<TableCellCalculations>(vm =>
            {
                vm.Value = GetAverage(part, context);
            }).Location("Average")
            .OnGroup(context.GroupId);

            var sumShape = Initialize<TableCellCalculations>(vm =>
            {
                vm.Value = GetSum(part, context);
            }).Location("Sum")
            .OnGroup(context.GroupId);

            return Task.FromResult<IDisplayResult>(Combine(contentShape, avgShape, sumShape));
        }

        return Task.FromResult<IDisplayResult>(null);
    }

    public override Task<IDisplayResult> InterviewEditAsync(PredefinedListSurveyControlPart part, BuildPartEditorContext context)
    {
        // build editor for interview
        var metadata = part.ContentItem.GetOrCreate<PredefinedListSurveyControlPartMetadata>();

        // we may need to get the titlePart and the Description part here...
        var shape = Initialize<PredefinedListSurveyControlInterviewViewModel>("PredefinedListSurveyControlInterview_Edit", vm =>
        {
            vm.Description = part.Description;
            vm.IsRequired = metadata.IsRequired;
            vm.Title = part.ContentItem.DisplayText;
            vm.Hint = metadata.Hint;

            vm.Multiple = metadata.Multiple;
            vm.MinLength = metadata.MinLength;
            vm.MaxLength = metadata.MaxLength;
            vm.Editor = metadata.Editor;
            vm.Values = part.Values;
            vm.RawOptions = metadata.Options;
        }).Location("Content:1")
        .OnGroup(context.GroupId);

        return Task.FromResult<IDisplayResult>(shape);
    }

    public override Task<IDisplayResult> AdminEditAsync(PredefinedListSurveyControlPart part, BuildPartEditorContext context)
    {
        var metadataPart = part.ContentItem.GetOrCreate<PredefinedListSurveyControlPartMetadata>();

        var metadataShape = Initialize<PredefinedListSurveyControlPartMetadataViewModel>("PredefinedListSurveyControlPartMetadata_Edit", vm =>
        {
            vm.Hint = metadataPart.Hint;
            vm.Description = metadataPart.Description;
            vm.IsRequired = metadataPart.IsRequired;
            vm.Multiple = metadataPart.Multiple;
            vm.MinLength = metadataPart.MinLength;
            vm.MaxLength = metadataPart.MaxLength;
            vm.Threshold = metadataPart.Threshold;
        }).Location("Parts:15")
        .OnGroup(context.GroupId);

        var predefineShape = Initialize<PredefinedListSettingsViewModel>("SurveyControlPredefinedListEditorSettings_Edit", model =>
        {
            model.Editor = metadataPart.Editor;
            model.Options = JsonSerializer.Serialize(metadataPart.Options ?? [], JOptions.Indented);
        }).Location("Parts:20")
        .OnGroup(context.GroupId);

        return Task.FromResult<IDisplayResult>(Combine(metadataShape, predefineShape));
    }

    public override async Task<IDisplayResult> InterviewUpdateAsync(PredefinedListSurveyControlPart part, IUpdateModel updater, BuildPartEditorContext context)
    {
        part.ContentItem.Weld<SurveyControlPartMetadata>();
        part.ContentItem.Weld<PredefinedListSurveyControlPartMetadata>();

        var vm = new PredefinedListSurveyControlPart();

        // doing interview validation
        var metadataPart = part.ContentItem.As<PredefinedListSurveyControlPartMetadata>();

        await updater.TryUpdateModelAsync(vm, Prefix);

        // get the select values that are in the metadata options!
        var values = vm.Values?.Intersect(metadataPart.Options.Select(x => x.Value)) ?? [];
        var totalValues = values.Count();
        if (metadataPart.IsRequired && totalValues == 0)
        {
            updater.ModelState.AddModelError(Prefix, nameof(PredefinedListSurveyControlPart.Values), S["The field is required"]);
        }

        if (metadataPart.MinLength.HasValue && metadataPart.MinLength.Value < totalValues)
        {
            updater.ModelState.AddModelError(Prefix, nameof(PredefinedListSurveyControlPart.Values), S["At least {0} options are required.", metadataPart.MinLength]);
        }

        if (metadataPart.MaxLength.HasValue && metadataPart.MaxLength.Value > totalValues)
        {
            updater.ModelState.AddModelError(Prefix, nameof(PredefinedListSurveyControlPart.Values), S["At most {0} options can be selected.", metadataPart.MaxLength]);
        }

        part.Values = values.ToArray();


        return await InterviewEditAsync(part, context);
    }

    public override async Task<IDisplayResult> AdminUpdateAsync(PredefinedListSurveyControlPart part, IUpdateModel updater, UpdatePartEditorContext context)
    {
        var model = new PredefinedListSettingsViewModel();
        var metadataVm = new PredefinedListSurveyControlPartMetadataViewModel();
        await updater.TryUpdateModelAsync(metadataVm, Prefix);
        await updater.TryUpdateModelAsync(model, Prefix);

        var metadata = part.ContentItem.GetOrCreate<PredefinedListSurveyControlPartMetadata>();
        metadata.Description = metadataVm.Description;
        metadata.Hint = metadataVm.Hint;
        metadata.IsRequired = metadataVm.IsRequired;
        metadata.Multiple = metadataVm.Multiple;
        metadata.MinLength = metadataVm.MinLength;
        metadata.MaxLength = metadataVm.MaxLength;
        metadata.Threshold = metadataVm.Threshold;
        metadata.Editor = model.Editor;
        metadata.Options = string.IsNullOrWhiteSpace(model.Options)
        ? []
        : JsonSerializer.Deserialize<ListControlValueOption[]>(model.Options, JOptions.Default);

        part.ContentItem.Apply(metadata);

        return await AdminEditAsync(part, context);
    }

    private static IEnumerable<double> GetWeights(PredefinedListSurveyControlPart part)
    {
        if (part.Values == null)
        {
            return [];
        }

        var metadata = part.ContentItem.GetOrCreate<PredefinedListSurveyControlPartMetadata>();

        return metadata.Options.Where(x => part.Values.Contains(x.Value) && x.Weight.HasValue)
                               .Select(x => x.Weight.Value);
    }

}
