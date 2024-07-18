using ApplicantTest.Models;
using Microsoft.AspNetCore.Mvc;
using OrchardCore.ContentManagement;
using System.Threading.Tasks;

namespace ApplicantTest.Controllers;

public class ApplicantTestController : Controller
{
    private readonly IContentManager _contentManager;

    public ApplicantTestController(IContentManager contentManager)
    {
        _contentManager = contentManager;
    }

    [HttpPost]
    [Route("/UserUpdated")]
    public async Task<IActionResult> Update([FromBody] UpdateRequest request)
    {
        var contentItem = await _contentManager.GetAsync(request.ContentItemId, VersionOptions.Latest);
        if (contentItem == null)
        {
            return NotFound();
        }

        var part = contentItem.As<ApplicantTestPart>();
        if (part != null)
        {
            switch (request.FieldName)
            {
                case "EmailSent":
                part.Email = request.Value;
                break;
                case "BookmarkClicked":
                part.BookMarkClicked = request.Value;
                break;
                case "formSubmitted":
                part.formSubmitted = request.Value;
                break;
                case "MessageSentToAsakoSatoshi":
                part.MessageSentToAsakoSatoshi = request.Value;
                break;
                case "MessageSentToLilyWang":
                part.MessageSentToLilyWang = request.Value;
                break;
                case "MessageSentToMadisonByers":
                part.MessageSentToMadisonByers = request.Value;
                break;
                case "MessageSentToDominicGonzalez":
                part.MessageSentToDominicGonzalez = request.Value;
                break;
                case "MessageSentToSimoneKhan":
                part.MessageSentToSimoneKhan = request.Value;
                break;
            }

            await _contentManager.UpdateAsync(contentItem);
        }

        return Ok("Success");
    }

    public class UpdateRequest
    {
        public string ContentItemId { get; set; }
        public string FieldName { get; set; }
        public int Value { get; set; }
    }
}
