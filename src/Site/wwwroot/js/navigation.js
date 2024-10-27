const menuState = {
    activeMenuItem: null,
    allMenuItems: [],
    subMenus: []
};

document.body.onload = function() {
    // find the menu element
    const menu = document.getElementById('menu');
    if(!menu) {
        console.error('The #menu element could not be found');
        return;
    }

    // find all menu items (links with the "w3-bar-item" class) and sort them by pathname length descending (this helps finding the active menu item later)
    menuState.allMenuItems = Array
        .from(menu.querySelectorAll('a.w3-bar-item'))
        .filter(item => item.pathname !== '/')
        .sort((a, b) => b.pathname.length - a.pathname.length);

    // find all sub menu containers (they have a "data-parent-menu" attribute)
    menuState.subMenus = menu.querySelectorAll('[data-parent-menu]');

    // initialize the menu for first page load
    updateMenu(window.location.pathname)

    // all internal navigation changes trigger the "popstate" event, so let's update the menu state on that event 
    window.addEventListener('popstate', function (event) {
        // reflect the route change in the navigation menu
        updateMenu(event.target.location.pathname);

        // make sure the meta content is updated for the current page
        updateMetaContent();
    });
}

const updateMenu = (currentPathname) => {
    // show/hide sub menus as applicable for the current window location (dataset.parentMenu contains the pathname for the parent menu item)
    menuState.subMenus.forEach((subNav) => {
        subNav.style.display = window.location.pathname.startsWith(subNav.dataset.parentMenu) ? 'block' : 'none';
    });

    // remove the active state from the previous active menu item
    if (menuState.activeMenuItem) {
        menuState.activeMenuItem.classList.toggle('w3-bar-item-active');
    }

    // don't highlight root navigation menu items
    if (!currentPathname || currentPathname === '/') {
        menuState.activeMenuItem = null;
        return;
    }

    // find the best closest menu item to the current window location and make it active
    menuState.activeMenuItem = menuState.allMenuItems.find(n => currentPathname.startsWith(n.pathname));
    menuState.activeMenuItem?.classList.toggle('w3-bar-item-active');
}

const updateMetaContent = () => {
    const currentPage = document.umbCurrentPage;
    document.querySelector('meta[name="og:title"]').setAttribute("content", currentPage.properties.title ?? '');
    document.querySelector('meta[name="description"]').setAttribute("content", currentPage.properties.seoDescription ?? '');
    document.querySelector('meta[name="keywords"]').setAttribute("content", currentPage.properties.seoKeywords?.join(', ') ?? '');
}