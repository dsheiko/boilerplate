
import config from "@/utils/config/index";
import { connect, query } from "@/utils/model/connector";
import ProjectModel from "@/utils/model/Project";

await connect( config.mysql );
export const projectModel = new ProjectModel( { query } );