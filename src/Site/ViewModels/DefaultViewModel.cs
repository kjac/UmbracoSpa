using Microsoft.AspNetCore.Html;
using Umbraco.Cms.Core.Models.PublishedContent;

namespace Site.ViewModels;

public class DefaultViewModel
{
    public required IPublishedContent CurrentPage { get; init; }

    public required IHtmlContent ApiContent { get; init; }
}