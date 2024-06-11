import { API_VER } from "../Util/constants";
import pkg from "../../package.json";

export default function versionRoutes( router ) {
	
    router.get( API_VER + "/version", async ( req, res ) => {
        try {
            return res.send( pkg.version );
        } catch ( err ) {
            next( err );
        }
    });
}