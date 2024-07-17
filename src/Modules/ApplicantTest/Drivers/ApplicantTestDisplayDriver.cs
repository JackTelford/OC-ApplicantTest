using ApplicantTest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;
using System.Threading.Tasks;

namespace ApplicantTest.Drivers
{
    public class ApplicantTestDisplayDriver : ContentPartDisplayDriver<ApplicantTestPart>
    {
        internal readonly IStringLocalizer S;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ApplicantTestDisplayDriver(IStringLocalizer<ApplicantTestDisplayDriver> stringLocalizer, IHttpContextAccessor httpContextAccessor)
        {
            S = stringLocalizer;
            _httpContextAccessor = httpContextAccessor;
        }

        public override IDisplayResult Display(ApplicantTestPart part, BuildPartDisplayContext context)
        {
            return Initialize<ApplicantTestPart>("ApplicantTestPart", m =>
            {
                m.ApplicantTest = part.ApplicantTest;
                m.Email = part.Email;
                m.MessageSentToAsakoSatoshi = part.MessageSentToAsakoSatoshi;
                m.MessageSentToLilyWang = part.MessageSentToLilyWang;
                m.MessageSentToMadisonByers = part.MessageSentToMadisonByers;
                m.MessageSentToDominicGonzalez = part.MessageSentToDominicGonzalez;
                m.MessageSentToSimoneKhan = part.MessageSentToSimoneKhan;
                m.BookMarkClicked = part.BookMarkClicked;
                m.formSubmitted = part.formSubmitted;
            })
            .Location("Detail", "Content:10")
            .Location("Summary", "Content:10");
        }

        public override IDisplayResult Edit(ApplicantTestPart part, BuildPartEditorContext context)
        {
            return Initialize<ApplicantTestPart>("ApplicantTestPart_Edit", m =>
            {
                m.ApplicantTest = part.ApplicantTest;
                m.Email = part.Email;
                m.MessageSentToAsakoSatoshi = part.MessageSentToAsakoSatoshi;
                m.MessageSentToLilyWang = part.MessageSentToLilyWang;
                m.MessageSentToMadisonByers = part.MessageSentToMadisonByers;
                m.MessageSentToDominicGonzalez = part.MessageSentToDominicGonzalez;
                m.MessageSentToSimoneKhan = part.MessageSentToSimoneKhan;
                m.BookMarkClicked = part.BookMarkClicked;
                m.formSubmitted = part.formSubmitted;
            });
        }

        public override async Task<IDisplayResult> UpdateAsync(ApplicantTestPart part, IUpdateModel updater, UpdatePartEditorContext context)
        {
            var httpContext = _httpContextAccessor.HttpContext;

            if (httpContext.Request.Method == "POST" && httpContext.Request.ContentType.Contains("application/json"))
            {
                // Read JSON request body
                var json = await httpContext.Request.ReadFromJsonAsync<UpdateRequest>();
                if (json != null)
                {
                    switch (json.FieldName)
                    {
                        case "EmailSent":
                        part.Email = json.Value;
                        break;
                        case "MessageSentToAsakoSatoshi":
                        part.MessageSentToAsakoSatoshi = json.Value;
                        break;
                        case "MessageSentToLilyWang":
                        part.MessageSentToLilyWang = json.Value;
                        break;
                        case "MessageSentToMadisonByers":
                        part.MessageSentToMadisonByers = json.Value;
                        break;
                        case "MessageSentToDominicGonzalez":
                        part.MessageSentToDominicGonzalez = json.Value;
                        break;
                        case "MessageSentToSimoneKhan":
                        part.MessageSentToSimoneKhan = json.Value;
                        break;
                        case "BookmarkClicked":
                        part.BookMarkClicked = json.Value;
                        break;
                        case "formSubmitted":
                        part.formSubmitted = json.Value;
                        break;
                    }
                }
            }

            await updater.TryUpdateModelAsync(part, Prefix);
            return Edit(part, context);
        }

        private class UpdateRequest
        {
            public string FieldName { get; set; }
            public int Value { get; set; }
        }
    }
}




















/*using ApplicantTest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.ModelBinding;
using OrchardCore.DisplayManagement.Views;

namespace ApplicantTest.Drivers;

public class ApplicantTestDisplayDriver : ContentPartDisplayDriver<ApplicantTestPart>
{
    internal readonly IStringLocalizer S;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ApplicantTestDisplayDriver(IStringLocalizer<ApplicantTestDisplayDriver> stringLocalizer, IHttpContextAccessor httpContextAccessor)
    {
        S = stringLocalizer;
        _httpContextAccessor = httpContextAccessor;
    }

    public override IDisplayResult Display(ApplicantTestPart part, BuildPartDisplayContext context)
    {
        return Initialize<ApplicantTestPart>("ApplicantTestPart", m =>
        {
            m.ApplicantTest = part.ApplicantTest;
            m.Email = part.Email;
            m.MessageSentToAsakoSatoshi = part.MessageSentToAsakoSatoshi;
            m.MessageSentToLilyWang = part.MessageSentToLilyWang;
            m.MessageSentToMadisonByers = part.MessageSentToMadisonByers;
            m.MessageSentToDominicGonzalez = part.MessageSentToDominicGonzalez;
            m.MessageSentToSimoneKhan = part.MessageSentToSimoneKhan;
            m.BookMarkClicked = part.BookMarkClicked;
            m.formSubmitted = part.formSubmitted;
        })
        .Location("Detail", "Content:10")
        .Location("Summary", "Content:10");
    }

    public override IDisplayResult Edit(ApplicantTestPart part, BuildPartEditorContext context)
    {
        return Initialize<ApplicantTestPart>("ApplicantTestPart_Edit", m =>
        {
            m.ApplicantTest = part.ApplicantTest;
            m.Email = part.Email;
            m.MessageSentToAsakoSatoshi = part.MessageSentToAsakoSatoshi;
            m.MessageSentToLilyWang = part.MessageSentToLilyWang;
            m.MessageSentToMadisonByers = part.MessageSentToMadisonByers;
            m.MessageSentToDominicGonzalez = part.MessageSentToDominicGonzalez;
            m.MessageSentToSimoneKhan = part.MessageSentToSimoneKhan;
            m.BookMarkClicked = part.BookMarkClicked;
            m.formSubmitted = part.formSubmitted;
        });
    }

    public override async Task<IDisplayResult> UpdateAsync(ApplicantTestPart part, IUpdateModel updater, UpdatePartEditorContext context)
    {
        var httpContext = _httpContextAccessor.HttpContext;

        if (httpContext.Request.Method == "POST")
        {
            if (httpContext.Request.Form.ContainsKey("EmailSent"))
            {
                part.Email = int.Parse(httpContext.Request.Form["EmailSent"]);
            }
            if (httpContext.Request.Form.ContainsKey("MessageSentToAsakoSatoshi"))
            {
                part.MessageSentToAsakoSatoshi = int.Parse(httpContext.Request.Form["MessageSentToAsakoSatoshi"]);
            }
            if (httpContext.Request.Form.ContainsKey("MessageSentToLilyWang"))
            {
                part.MessageSentToLilyWang = int.Parse(httpContext.Request.Form["MessageSentToLilyWang"]);
            }
            if (httpContext.Request.Form.ContainsKey("MessageSentToMadisonByers"))
            {
                part.MessageSentToMadisonByers = int.Parse(httpContext.Request.Form["MessageSentToMadisonByers"]);
            }
            if (httpContext.Request.Form.ContainsKey("MessageSentToDominicGonzalez"))
            {
                part.MessageSentToDominicGonzalez = int.Parse(httpContext.Request.Form["MessageSentToDominicGonzalez"]);
            }
            if (httpContext.Request.Form.ContainsKey("MessageSentToSimoneKhan"))
            {
                part.MessageSentToSimoneKhan = int.Parse(httpContext.Request.Form["MessageSentToSimoneKhan"]);
            }
            if (httpContext.Request.Form.ContainsKey("BookmarkClicked"))
            {
                part.BookMarkClicked = int.Parse(httpContext.Request.Form["BookmarkClicked"]);
            }
            if (httpContext.Request.Form.ContainsKey("formSubmitted"))
            {
                part.formSubmitted = int.Parse(httpContext.Request.Form["formSubmitted"]);
            }
        }

        await updater.TryUpdateModelAsync(part, Prefix);
        return Edit(part, context);
    }
}*/



/*using ApplicantTest.Models;
using Microsoft.Extensions.Localization;
using OrchardCore.ContentManagement.Display.ContentDisplay;
using OrchardCore.ContentManagement.Display.Models;
using OrchardCore.DisplayManagement.Views;

namespace ApplicantTest.Drivers;
public class ApplicantTestDisplayDriver : ContentPartDisplayDriver<ApplicantTestPart>
{
internal readonly IStringLocalizer S;

public ApplicantTestDisplayDriver(IStringLocalizer<ApplicantTestDisplayDriver> stringLocalizer)
{
    S = stringLocalizer;
}

public override IDisplayResult Display(ApplicantTestPart part, BuildPartDisplayContext context)
{
    return Initialize<ApplicantTestPart>("ApplicantTestPart", m => m.ApplicantTest = part.ApplicantTest)
        .Location("Detail", "Content:10")
        .Location("Summary", "Content:10");
}

public override IDisplayResult Edit(ApplicantTestPart part)
{
    return Initialize<ApplicantTestPart>("ApplicantTestPart_Edit", model => { model.ApplicantTest = part.ApplicantTest; })
       .Location("Content");
}
}
*/

// path src/Modules/CloudSolutions.ApplicantTest.csproj/Drivers/ApplicantTestDisplayDriver.cs
