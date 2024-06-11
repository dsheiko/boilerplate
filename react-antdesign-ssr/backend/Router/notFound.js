import { API_VER } from "../Util/constants";

export default function notFoundRoutes( router ) {
	
    router.get( API_VER + "/*", async ( req, res ) => {
        try {
            return res.sendStatus( 404 );
        } catch ( err ) {
            next( err );
        }
    });
}