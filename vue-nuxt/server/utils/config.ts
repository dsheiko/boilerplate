import type { ConnectionOptions } from "mysql2/promise";

const {
  DEMO_DB_USER,
  DEMO_DB_PASS,
  DEMO_DB_HOST,
  DEMO_DB_NAME,
} = process.env;

if ( [ DEMO_DB_USER, DEMO_DB_PASS, DEMO_DB_HOST, DEMO_DB_NAME ].includes( undefined ) ) {
  throw new Error( `Missing one of required ENV variables `
    + `DEMO_DB_USER, DEMO_DB_PASS, DEMO_DB_HOST, DEMO_DB_NAME` );
}

const mysqlConfig: ConnectionOptions = {
  host: DEMO_DB_HOST,
  user: DEMO_DB_USER,
  password: DEMO_DB_PASS,
  database: DEMO_DB_NAME,
};

export default { mysql: mysqlConfig };
