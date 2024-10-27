import {Router} from 'https://cdn.jsdelivr.net/npm/@vaadin/router@1.7.5/+esm';

let firstPageLoad = true;

const loadContent = async (context, commands) => {
    // on first page load, the current page content (document.umbCurrentPage) has been set by the server to avoid an extra request 
    if (firstPageLoad) {
        firstPageLoad = false;
        return renderContent(commands);
    }

    // don't load the same content again when visiting the current route
    if (document.umbCurrentPage && context.path === document.umbCurrentPage.route.path) {
        return renderContent(commands);
    }

    // fetch content from the Delivery API 
    const response = await fetch(`/umbraco/delivery/api/v2/content/item${context.path}`);

    // store the response on the DOM root for the Web Components (fake a 404 page if the request failed)
    document.umbCurrentPage = response.ok
        ? await response.json()
        : {contentType: 'notFoundPage', route: {}, properties: {}};
    
    return renderContent(commands);
};

const renderContent = (commands) => {
    // translate content type alias (e.g. homePage) to its corresponding Web Component name (e.g. home-page)
    const customElementName = document.umbCurrentPage.contentType.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase());
    return commands.component(customElementName);
};

// setup the router - all routes should be handled by loading content from the Delivery API
const outlet = document.getElementById('outlet');
const router = new Router(outlet);
router.setRoutes([{path: '(.*)', action: loadContent}]);
