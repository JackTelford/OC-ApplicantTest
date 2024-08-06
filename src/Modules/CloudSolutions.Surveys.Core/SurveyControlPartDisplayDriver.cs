using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;

namespace CloudSolutions.Surveys.Core;

public abstract class SurveyControlPartDisplayDriver<TPart> : ContentPartDisplayDriver<TPart> where TPart : ContentPart, new()
{
    public virtual Task<IDisplayResult> InterviewEditAsync(TPart part, BuildPartEditorContext context)
    {
        if (SurveyConstants.InterviewContentType != context.GroupId)
        {
            return Task.FromResult<IDisplayResult>(null);
        }

        return Task.FromResult<IDisplayResult>(null);
    }

    public virtual Task<IDisplayResult> AdminEditAsync(TPart part, BuildPartEditorContext context)
    {
        return Task.FromResult<IDisplayResult>(null);
    }

    public sealed override Task<IDisplayResult> EditAsync(TPart part, BuildPartEditorContext context)
    {
        if (SurveyConstants.InterviewContentType == context.GroupId)
        {
            return InterviewEditAsync(part, context);
        }

        return AdminEditAsync(part, context);
    }

    public virtual Task<IDisplayResult> InterviewUpdateAsync(TPart part, IUpdateModel updater, BuildPartEditorContext context)
    {
        if (SurveyConstants.InterviewContentType != context.GroupId)
        {
            return Task.FromResult<IDisplayResult>(null);
        }

        return Task.FromResult<IDisplayResult>(null);
    }

    public virtual Task<IDisplayResult> AdminUpdateAsync(TPart part, IUpdateModel updater, UpdatePartEditorContext context)
    {
        return Task.FromResult<IDisplayResult>(null);
    }

    public sealed override Task<IDisplayResult> UpdateAsync(TPart part, UpdatePartEditorContext context)
    {
        return base.UpdateAsync(part, context);
    }

    public sealed override Task<IDisplayResult> UpdateAsync(TPart part, IUpdateModel updater, UpdatePartEditorContext context)
    {
        if (SurveyConstants.InterviewContentType == context.GroupId)
        {
            return InterviewUpdateAsync(part, updater, context);
        }

        return AdminUpdateAsync(part, updater, context);
    }

    public sealed override IDisplayResult Edit(TPart part)
    {
        return base.Edit(part);
    }

    public sealed override IDisplayResult Edit(TPart part, BuildPartEditorContext context)
    {
        return base.Edit(part, context);
    }

    public sealed override Task<IDisplayResult> UpdateAsync(TPart part, IUpdateModel updater)
    {
        return base.UpdateAsync(part, updater);
    }
}
