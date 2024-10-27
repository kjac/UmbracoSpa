using Site.Controllers;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Web.Website.Controllers;

namespace Site.Composing;

public class DefaultControllerComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
        // DefaultController handles all page types - use that instead of the default Umbraco RenderController 
        => builder.Services.Configure<UmbracoRenderingDefaultsOptions>(c =>
        {
            c.DefaultControllerType = typeof(DefaultController);
        });
}