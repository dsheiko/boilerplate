import { Router } from "express"
import projectsRoutes from "./projects"
import versionRoutes from "./version"
import healthRoutes from "./health"
// import notFoundRoutes from "./notFound";
import renderRoutes from "./Render";

export default function ( models ) {
    const router = Router();
    projectsRoutes( router, models );
    healthRoutes( router );
    versionRoutes( router );
    // notFoundRoutes( router );
    renderRoutes( router, models );
    return router;
}
