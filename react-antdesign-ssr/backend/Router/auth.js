import { API_VER } from "../Util/constants";

export default function healthRoutes( router ) {
	
    router.post( API_VER + "/login", async ( req, res, next ) => {
        try {
            const { email, password } = req.body;
            if ( email.trim() === "john.doe@acme.com" && password.trim() === "Password1" ) {
                return res.send( { ok: 1 } );
            }
            throw new Error( "Wrong email address or password." );
        } catch ( err ) {
            next( err );
        }
    });
}