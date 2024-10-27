using System.Text.Json;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Site.ViewModels;
using Umbraco.Cms.Core.DeliveryApi;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;

namespace Site.Controllers;

public class DefaultController : RenderController
{
    private readonly IApiContentBuilder _apiContentBuilder;

    public DefaultController(
        ILogger<RenderController> logger,
        ICompositeViewEngine compositeViewEngine,
        IUmbracoContextAccessor umbracoContextAccessor,
        IApiContentBuilder apiContentBuilder)
        : base(logger, compositeViewEngine, umbracoContextAccessor)
        => _apiContentBuilder = apiContentBuilder;

    public override IActionResult Index()
    {
        if (CurrentPage is null)
        {
            return NotFound();
        }

        // render Delivery API JSON output for the current page.
        // NOTE: the default Umbraco JSON serializer in V13 is based on Json.NET and serializes in PascalCase.
        //       the Delivery API however uses System.Text.Json and serializes in camelCase, so in order to create
        //       compatible JSON, we need to do that explicitly.
        //       this is fixed in V14.
        var apiContent = new HtmlString(
            JsonSerializer.Serialize(
                _apiContentBuilder.Build(CurrentPage),
                new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                })
        );

        return CurrentTemplate(
            new DefaultViewModel
            {
                CurrentPage = CurrentPage,
                ApiContent = apiContent
            }
        );
    }
}