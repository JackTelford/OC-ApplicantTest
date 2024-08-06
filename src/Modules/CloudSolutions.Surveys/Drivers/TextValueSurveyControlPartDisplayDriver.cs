using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.Core.Models;
using CloudSolutions.Surveys.ViewModels;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;
using OrchardCore.Email;
using OrchardCore.Mvc.ModelBinding;

namespace CloudSolutions.Surveys.Drivers;

public sealed class TextValueSurveyControlPartDisplayDriver : SurveyControlPartDisplayDriver<TextValueSurveyControlPart>
{
    private readonly IEmailAddressValidator _emailAddressValidator;

    internal readonly IStringLocalizer S;

    public TextValueSurveyControlPartDisplayDriver(
        IStringLocalizer<NumericValueSurveyControlPartDisplayDriver> stringLocalizer,
        IEmailAddressValidator emailAddressValidator)
    {
        S = stringLocalizer;
        _emailAddressValidator = emailAddressValidator;
    }

    public override Task<IDisplayResult> DisplayAsync(TextValueSurveyControlPart part, BuildPartDisplayContext context)
    {
        if (context.GroupId == SurveyConstants.Report)
        {
            var contentShape = Initialize<TableCellViewModel>("TableCell", vm =>
            {
                vm.Values = [part.Text];
            }).Location("Content")
            .OnGroup(context.GroupId);

            return Task.FromResult<IDisplayResult>(contentShape);
        }

        return Task.FromResult<IDisplayResult>(null);
    }

    public override Task<IDisplayResult> InterviewEditAsync(TextValueSurveyControlPart part, BuildPartEditorContext context)
    {
        // build editor for interview
        var metadata = part.ContentItem.As<TextValueSurveyControlPartMetadata>() ?? new TextValueSurveyControlPartMetadata();

        // we may need to get the titlePart and the Description part here...
        var shape = Initialize<TextValueSurveyControlInterviewViewModel>("TextValueSurveyControlInterview_Edit", vm =>
        {
            vm.Description = part.Description;
            vm.IsRequired = metadata.IsRequired;
            vm.Title = part.ContentItem.DisplayText;
            vm.Hint = metadata.Hint;
            vm.Text = part.Text;
            vm.Editor = metadata.Editor;
        }).Location("Content:1").OnGroup(context.GroupId);

        return Task.FromResult<IDisplayResult>(shape);
    }

    public override async Task<IDisplayResult> InterviewUpdateAsync(TextValueSurveyControlPart part, IUpdateModel updater, BuildPartEditorContext context)
    {
        var model = new TextValueSurveyControlPart();

        // doing interview validation
        var metadataPart = part.ContentItem.As<TextValueSurveyControlPartMetadata>();

        await updater.TryUpdateModelAsync(model, Prefix);

        // get the select values that are in the metadata options!
        if (metadataPart.IsRequired && string.IsNullOrWhiteSpace(model.Text))
        {
            updater.ModelState.AddModelError(Prefix, nameof(TextValueSurveyControlPart.Text), S["The field is required"]);
        }

        var valueLength = model.Text?.Length ?? 0;

        if (metadataPart.MinLength.HasValue && metadataPart.MinLength.Value > valueLength)
        {
            updater.ModelState.AddModelError(Prefix, nameof(TextValueSurveyControlPart.Text), S["At least {0} characters are required; {1} characters are used.", metadataPart.MinLength, valueLength]);
        }

        if (metadataPart.MaxLength.HasValue && metadataPart.MaxLength.Value < valueLength)
        {
            updater.ModelState.AddModelError(Prefix, nameof(TextValueSurveyControlPart.Text), S["A maximum of {0} characters can be used; {1} characters are used.", metadataPart.MaxLength, valueLength]);
        }

        if (string.Equals("Email", metadataPart.Editor, StringComparison.Ordinal) && !_emailAddressValidator.Validate(model.Text))
        {
            updater.ModelState.AddModelError(Prefix, nameof(TextValueSurveyControlPart.Text), S["A valid email address is required."]);
        }

        part.Text = model.Text;

        return await InterviewEditAsync(part, context);
    }

    public override Task<IDisplayResult> AdminEditAsync(TextValueSurveyControlPart part, BuildPartEditorContext context)
    {
        var metadataPart = part.ContentItem.As<TextValueSurveyControlPartMetadata>() ?? new TextValueSurveyControlPartMetadata();

        var metadataShape = Initialize<TextValueSurveyControlPartMetadataViewModel>("TextValueSurveyControlPartMetadata_Edit", vm =>
        {
            vm.Description = part.Description;
            vm.Hint = metadataPart.Hint;
            vm.IsRequired = metadataPart.IsRequired;
            vm.MinLength = metadataPart.MinLength;
            vm.MaxLength = metadataPart.MaxLength;
            vm.Editor = metadataPart.Editor;
            vm.EditorOptions =
            [
                new(S["Single-Line text"], string.Empty),
                new(S["Multi-Line text"], "TextArea"),
                new(S["Email"], "Email"),
            ];
        }).Location("Parts:15")
        .OnGroup(context.GroupId);

        return Task.FromResult<IDisplayResult>(metadataShape);
    }

    public override async Task<IDisplayResult> AdminUpdateAsync(TextValueSurveyControlPart part, IUpdateModel updater, UpdatePartEditorContext context)
    {
        part.ContentItem.Alter<SurveyControlPartMetadata>(p =>
        {
            p.Aggregable = false;
        });
        part.ContentItem.Weld<TextValueSurveyControlPartMetadata>();

        var metadataVm = new TextValueSurveyControlPartMetadataViewModel();

        await updater.TryUpdateModelAsync(metadataVm, Prefix);

        part.ContentItem.Alter<TextValueSurveyControlPartMetadata>(metadata =>
        {
            metadata.Description = metadataVm.Description;
            metadata.IsRequired = metadataVm.IsRequired;
            metadata.Hint = metadataVm.Hint;
            metadata.MinLength = metadataVm.MinLength;
            metadata.MaxLength = metadataVm.MaxLength;
            metadata.Editor = metadataVm.Editor;
        });

        return await AdminEditAsync(part, context);
    }
}
