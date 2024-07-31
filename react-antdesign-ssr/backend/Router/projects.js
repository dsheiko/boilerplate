import { API_VER } from "../Util/constants";

export default function projectsRoutes( router, { projectModel } ) {
	
    router.delete( API_VER + "/projects/:id", async ( req, res , next ) => {
        try {
            return res.send( await projectModel.remove( req.params.id ) );
        } catch ( err ) {
            next( err );
        }
        });

    router.put( API_VER + "/projects/:id", async ( req, res , next ) => {
        try {
            return res.send( await projectModel.update( req.params.id, req.body ) );
        } catch ( err ) {
            next( err );
        }
    });

    router.post( API_VER + "/projects", async ( req, res , next ) => {
        try {
            return res.send( await projectModel.add( req.body ) );
        } catch ( err ) {
            next( err );
        }
    });


    router.get( API_VER + "/projects/:id", async ( req, res , next ) => {
        try {
            return res.send( await projectModel.find( req.params.id ) );
        } catch ( err ) {
            next( err );
        }
    });

    router.get( API_VER + "/projects", async ( req, res , next ) => {
        try {
            return res.send( await projectModel.findAll( req.query ) );
        } catch ( err ) {
            next( err );
        }
    });
}