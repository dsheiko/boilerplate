import { API_VER } from "../Util/constants";

export default function healthRoutes( router ) {
	
    router.get( API_VER + "/health", async ( req, res ) => {
        try {
            return res.sendStatus( 200 );
        } catch ( err ) {
            next( err );
        }
    });
}