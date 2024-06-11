import { Router } from "express"
import projectsRoutes from "./projects"
import versionRoutes from "./version"
import healthRoutes from "./health"
import notFoundRoutes from "./notFound";

export default function ( models ) {
    const router = Router();
    projectsRoutes( router, models );
    healthRoutes( router );
    versionRoutes( router );
    notFoundRoutes( router );
    return router;
}
