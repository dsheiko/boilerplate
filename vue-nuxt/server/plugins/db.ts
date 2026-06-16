import serverConfig from "../utils/config";
import { connect } from "../utils/model/db";

export default defineNitroPlugin( async () => {
  await connect( serverConfig.mysql );
} );
