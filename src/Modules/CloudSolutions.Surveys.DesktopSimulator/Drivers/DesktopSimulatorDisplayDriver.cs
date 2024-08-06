using System.Globalization;
using System.Text.Json;
using System.Text.Json.Nodes;
using CloudSolutions.Surveys.Core;
using CloudSolutions.Surveys.DesktopSimulator.Models;
using CloudSolutions.Surveys.DesktopSimulator.ViewModels;
using CloudSolutions.Surveys.ViewModels;
using GraphQL;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;

namespace CloudSolutions.Surveys.DesktopSimulator.Drivers;

public sealed class DesktopSimulatorDisplayDriver : SurveyControlPartDisplayDriver<DesktopSimulatorPart>
{
    internal readonly IStringLocalizer S;

    public DesktopSimulatorDisplayDriver(
        IStringLocalizer<DesktopSimulatorDisplayDriver> stringLocalizer)
    {
        S = stringLocalizer;
    }

    public override Task<IDisplayResult> DisplayAsync(DesktopSimulatorPart part, BuildPartDisplayContext context)
    {
        if (context.GroupId != SurveyConstants.Report)
        {
            return Task.FromResult<IDisplayResult>(null);
        }

        var metadata = part.ContentItem.As<DesktopSimulatorPartMetadata>() ?? new DesktopSimulatorPartMetadata();

        var contentShape = Initialize<TableCellViewModel>("TableCell", vm =>
        {
            if (part.Score.HasValue)
            {
                vm.Values = [part.Score.Value.ToString(metadata.Format, CultureInfo.InvariantCulture)];
            }
            else
            {
                vm.Values = [];
            }
        }).Location("Content")
        .OnGroup(context.GroupId);

        return Task.FromResult<IDisplayResult>(contentShape);
    }

    public override Task<IDisplayResult> InterviewEditAsync(DesktopSimulatorPart part, BuildPartEditorContext context)
    {
        var shape = Initialize<DesktopSimulatorPartViewModel>("DesktopSimulatorPart_Edit", viewModel =>
        {

        }).Location("Content:1")
        .OnGroup(context.GroupId);

        return Task.FromResult<IDisplayResult>(shape);
    }

    public override async Task<IDisplayResult> InterviewUpdateAsync(DesktopSimulatorPart part, IUpdateModel updater, BuildPartEditorContext context)
    {
        var vm = new DesktopSimulatorPartViewModel();
        var metadata = part.ContentItem.As<DesktopSimulatorPartMetadata>();

        await updater.TryUpdateModelAsync(vm, Prefix);

        if (metadata.ShouldCalulateScore())
        {
            part.Score = GetScore(vm, metadata);
        }

        return await InterviewEditAsync(part, context);
    }

    public override Task<IDisplayResult> AdminEditAsync(DesktopSimulatorPart part, BuildPartEditorContext context)
    {
        var metadata = part.ContentItem.GetOrCreate<DesktopSimulatorPartMetadata>();

        var metadataShape = Initialize<DesktopSimulatorPartMetadataViewModel>("DesktopSimulatorPartMetadata_Edit", model =>
        {
            // Model will not set less than > 0 or Greater than < 30.
            model.EmailSent = metadata.EmailSent;
            model.EmailSentWeight = metadata.EmailSentWeight;

            model.BookmarkClicked = metadata.BookmarkClicked;
            model.BookmarkClickedWeight = metadata.BookmarkClickedWeight;

            model.FormSubmitted = metadata.FormSubmitted;
            model.FormSubmittedWeight = metadata.FormSubmittedWeight;

            model.MessageSentToAsakoSatoshi = metadata.MessageSentToAsakoSatoshi;
            model.MessageSentToAsakoSatoshiWeight = metadata.MessageSentToAsakoSatoshiWeight;

            model.MessageSentToDominicGonzalez = metadata.MessageSentToDominicGonzalez;
            model.MessageSentToDominicGonzalezWeight = metadata.MessageSentToDominicGonzalezWeight;

            model.MessageSentToLilyWang = metadata.MessageSentToLilyWang;
            model.MessageSentToLilyWangWeight = metadata.MessageSentToLilyWangWeight;

            model.MessageSentToMadisonByers = metadata.MessageSentToMadisonByers;
            model.MessageSentToMadisonByersWeight = metadata.MessageSentToMadisonByersWeight;

            model.MessageSentToSimoneKhan = metadata.MessageSentToSimoneKhan;
            model.MessageSentToSimoneKhanWeight = metadata.MessageSentToSimoneKhanWeight;

            model.Description = part.Description;
            model.Hint = metadata.Hint;
            model.IsRequired = metadata.IsRequired;
        }).Location("Content:1")
        .OnGroup(context.GroupId);

        return Task.FromResult<IDisplayResult>(metadataShape);
    }

    public override async Task<IDisplayResult> AdminUpdateAsync(DesktopSimulatorPart part, IUpdateModel updater, UpdatePartEditorContext context)
    {
        var model = new DesktopSimulatorPartMetadataViewModel();

        await updater.TryUpdateModelAsync(model, Prefix);

        part.ContentItem.Alter<DesktopSimulatorPartMetadata>(metadata =>
        {
            metadata.EmailSent = model.EmailSent;
            metadata.EmailSentWeight = 0;

            if (model.EmailSent)
            {
                metadata.EmailSentWeight = model.EmailSentWeight;
            }

            metadata.BookmarkClicked = model.BookmarkClicked;
            metadata.BookmarkClickedWeight = 0;

            if (model.BookmarkClicked)
            {
                metadata.BookmarkClickedWeight = model.BookmarkClickedWeight;
            }

            metadata.FormSubmitted = model.FormSubmitted;
            metadata.FormSubmittedWeight = 0;

            if (model.FormSubmitted)
            {
                metadata.FormSubmittedWeight = model.FormSubmittedWeight;
            }

            metadata.MessageSentToAsakoSatoshi = model.MessageSentToAsakoSatoshi;
            metadata.MessageSentToAsakoSatoshiWeight = 0;

            if (model.MessageSentToAsakoSatoshi)
            {
                metadata.MessageSentToAsakoSatoshiWeight = model.MessageSentToAsakoSatoshiWeight;
            }

            metadata.MessageSentToDominicGonzalez = model.MessageSentToDominicGonzalez;
            metadata.MessageSentToDominicGonzalezWeight = 0;

            if (model.MessageSentToDominicGonzalez)
            {
                metadata.MessageSentToDominicGonzalezWeight = model.MessageSentToDominicGonzalezWeight;
            }

            metadata.MessageSentToLilyWang = model.MessageSentToLilyWang;
            metadata.MessageSentToLilyWangWeight = 0;
            if (model.MessageSentToLilyWang)
            {
                metadata.MessageSentToLilyWangWeight = model.MessageSentToLilyWangWeight;
            }

            metadata.MessageSentToMadisonByers = model.MessageSentToMadisonByers;
            metadata.MessageSentToMadisonByersWeight = 0;

            if (model.MessageSentToMadisonByers)
            {
                metadata.MessageSentToMadisonByersWeight = model.MessageSentToMadisonByersWeight;
            }

            metadata.MessageSentToSimoneKhan = model.MessageSentToSimoneKhan;
            metadata.MessageSentToSimoneKhanWeight = 0;

            if (model.MessageSentToSimoneKhan)
            {
                metadata.MessageSentToSimoneKhanWeight = model.MessageSentToSimoneKhanWeight;
            }

            metadata.Description = model.Description;
            metadata.IsRequired = model.IsRequired;
            metadata.Hint = model.Hint;
        });

        return await AdminEditAsync(part, context);
    }

    private static double? GetScore(DesktopSimulatorPartViewModel vm, DesktopSimulatorPartMetadata metadata)
    {
        if (!metadata.ShouldCalulateScore())
        {
            return null;
        }

        JsonArray eventItems = [];

        try
        {
            eventItems = JsonSerializer.Deserialize<JsonArray>(vm.Events);
        }
        catch (Exception)
        {
        }

        var score = 0d;
        var processedEvents = new HashSet<string>();

        foreach (var eventItem in eventItems)
        {
            if (eventItem is not JsonObject evtObject)
            {
                continue;
            }

            var eventName = evtObject["event"]?.Value<string>();
            var detailsObj = evtObject["details"] as JsonObject;

            if (eventName == null || detailsObj == null)
            {
                continue;
            }

            if (eventName == "emailSent")
            {
                var to = detailsObj["to"]?.Value<string>();
                var cc = detailsObj["cc"]?.Value<string>();
                var subject = detailsObj["subject"]?.Value<string>();
                var body = detailsObj["body"]?.Value<string>();

                if (metadata.EmailSent &&
                processedEvents.Add($"{eventName}_{to}") &&
                !string.IsNullOrEmpty(cc) &&
                !string.IsNullOrEmpty(subject) &&
                !string.IsNullOrEmpty(body))
                {
                    score += metadata.EmailSentWeight;

                    if (to == "amy@acmecorp.com")
                    {
                        score += 1;
                    }
                    if (cc == "bill@acmecorp.com")
                    {
                        score += 1;
                    }
                }

                continue;
            }

            if (eventName == "messageSent")
            {
                var selectedUser = detailsObj["selectedUser"]?.Value<string>();

                if (selectedUser == null)
                {
                    continue;
                }

                if (processedEvents.Add($"{eventName}_{selectedUser}"))
                {
                    if (metadata.MessageSentToAsakoSatoshi && selectedUser.Equals("Asako Satoshi", StringComparison.Ordinal))
                    {
                        score += metadata.MessageSentToAsakoSatoshiWeight;
                    }

                    if (metadata.MessageSentToDominicGonzalez && selectedUser.Equals("Dominic Gonzalez", StringComparison.Ordinal))
                    {
                        score += metadata.MessageSentToDominicGonzalezWeight;
                    }

                    if (metadata.MessageSentToLilyWang && selectedUser.Equals("Lily Wang", StringComparison.Ordinal))
                    {
                        score += metadata.MessageSentToLilyWangWeight;
                    }

                    if (metadata.MessageSentToMadisonByers && selectedUser.Equals("Madison Byers", StringComparison.Ordinal))
                    {
                        score += metadata.MessageSentToMadisonByersWeight;
                    }

                    if (metadata.MessageSentToSimoneKhan && selectedUser.Equals("Simone Khan", StringComparison.Ordinal))
                    {
                        score += metadata.MessageSentToSimoneKhanWeight;
                    }
                }

                continue;
            }

            if (eventName == "bookmarkClicked")
            {
                var name = detailsObj["name"]?.Value<string>();

                if (name == null)
                {
                    continue;
                }

                if (processedEvents.Add($"{eventName}_{name}"))
                {
                    if (metadata.BookmarkClicked && name.Equals("Sales Report", StringComparison.Ordinal))
                    {
                        score += metadata.BookmarkClickedWeight;
                    }

                    if (metadata.BookmarkClicked && name.Equals("Entry Form", StringComparison.Ordinal))
                    {
                        score += metadata.BookmarkClickedWeight;
                    }

                    /*  if (metadata.BookmarkClicked && name.Equals("Google", StringComparison.Ordinal))
                      {
                          score += metadata.BookmarkClickedWeight;
                      }*/
                }

                continue;
            }
        }

        return score;
    }
}
