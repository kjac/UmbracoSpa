import {LitElement, html, css, unsafeHTML} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

// base class for all page types
export class BasePage extends LitElement {
    static get styles() {
        return css`
            h1 {
                margin: 10px 0;
                font-size: 64px;
                font-weight: bold;
            }

            h2 {
                margin: 10px 0;
                font-size: 48px;
                color: #FF6347;
                font-weight: bold;
            }

            hr {
                width: 50px;
                border: 5px solid #DF73FF;
                border-radius: 4px;
                margin: 20px 0;
            }

            a {
                color: inherit;
            }
        `;
    }

    properties() {
        return document.umbCurrentPage.properties;
    }
}

// the home page element
export class HomePage extends BasePage {
    static get styles() {
        return [
            super.styles
        ];
    }

    render() {
        const properties = super.properties();
        return html`
            <h1>${properties.title}</h1>
            <h2>${properties.subTitle}</h2>
            <hr>
            <p>${unsafeHTML(properties.bodyText.markup)}</p>
        `;
    }
}

// the landing page element
export class LandingPage extends BasePage {
    static get styles() {
        return [
            super.styles
        ];
    }

    render() {
        const properties = super.properties();
        return html`
            <h1>${properties.title}</h1>
            <h2>${properties.subTitle}</h2>
            <hr>
            <p>${unsafeHTML(properties.bodyText.markup)}</p>
        `;
    }
}

// the article page element
export class ArticlePage extends HomePage {
    static get styles() {
        return [
            super.styles,
            css`
                small {
                    border-top: 1px solid;
                    padding-top: 10px;
                    margin-top: 20px;
                    display: inline-block;
                }
            `
        ];
    }

    render() {
        const properties = super.properties();
        return html`
            <h1>${properties.title}</h1>
            <h2>${properties.subTitle}</h2>
            <hr>
            <p>${unsafeHTML(properties.bodyText.markup)}</p>
            <small>This text was copied from <a href="https://www.wikipedia.org/">Wikipedia</a> under the <a
                    href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike
                License</a>.</small>
        `;
    }
}

// the not-found (404) page element
export class NotFoundPage extends BasePage {
    static get styles() {
        return [
            super.styles
        ];
    }

    render() {
        return html`
            <h1>Whoops!</b></h1>
            <h2>Page not found</h2>
            <hr>
            <p>This page no longer exists. Our bad - sorry about that :-(</p>
        `;
    }
}

customElements.define('home-page', HomePage);
customElements.define('landing-page', LandingPage);
customElements.define('article-page', ArticlePage);
customElements.define('not-found-page', NotFoundPage);
