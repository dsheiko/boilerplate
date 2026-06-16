import { saveAs, VIEWPORTS } from "../include/constants.js";

export class AbstractPage {
    constructor( page ) {
        this.page = page;
    }

    async screenshot( title, { el = null, fullPage = false } = {} ) {
        const target = el ?? this.page;
        const options = saveAs( title, fullPage ? null : this.viewport, fullPage );

        try {
            await target.screenshot( {
                ...options,
                timeout: options.timeout || 5000,
            } );
        } catch ( err ) {
            if ( err.name === "TimeoutError" ) {
                return;
            }
            throw err;
        }
    }

    async openPage( { viewport, path, timeout } = { viewport: null, path: null, timeout: 30000 } ) {
        viewport = viewport ?? VIEWPORTS.WUXGA;
        this.viewport = viewport;

        await this.page.setViewportSize( viewport );

        const url = path ?? this.baseUrl;
        
        await this.page.goto( url, { waitUntil: "load", timeout: timeout ?? 30000 } );

        await this.page.addStyleTag( {
            content: `* { transition: none !important; animation: none !important; }`,
        } );
    }

    async getLocationHostname() {
        return await this.page.evaluate( () => document.location.hostname );
    }
}
