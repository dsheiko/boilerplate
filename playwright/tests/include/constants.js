import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

export const BASE_URL = process.env.BASE_URL;
export const RES_PATH = join( __dirname, "..", "..", "test-results" );

export const saveAs = ( subPath, box = null, fullPage = false ) => {
    subPath = subPath.replace( /[^a-zA-Z0-9-_]/g, "-" );
    return {
        path: join( RES_PATH, box !== null
            ? `${subPath}-${box.width}x${box.height}` : subPath ) + ".png",
        fullPage,
        timeout: 3000
    };
};

export const isLeftTo = ( l1, l2 ) => l1.x + l1.width <= l2.x;
export const isAbove = ( l1, l2 ) => l1.y + l1.height <= l2.y;

export const VIEWPORTS = {
    def: ( str ) => {
        const [width, height] = str.split( "x" );
        return {
            width: parseInt( width, 10 ),
            height: parseInt( height, 10 )
        };
    },
    WUXGA: {
        width: 1920,
        height: 1200,
    },
    x768: {
        width: 768,
        height: 600
    },
    SVGA: {
        width: 800,
        height: 600
    },
    IPAD_MINI: {
        width: 768,
        height: 1024
    },
    IPHONE8: {
        width: 375,
        height: 667
    }
};

function delay( ms ) {
    return new Promise( ( resolve ) => {
        setTimeout( () => {
            resolve( true );
        }, ms );
    } );
}

// Recommended: use expect.poll() instead of waitFor() where possible
export const waitFor = ( ms ) => async () => {
    return await delay( ms );
};
