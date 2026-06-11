const { join } = require( "path" );

exports.SEL_FORM = `#myform`;
exports.SEL_SUBMIT = `button[type=submit]`;
exports.SEL_EMAIL = `[name=email]`;
exports.SEL_FNAME = `[name=firstName]`;
exports.SEL_VATID = `[name=vatId]`;
exports.SEL_DAY = `[name=day]`;
exports.SEL_MONTH = `[name=month]`;
exports.SEL_FILE_INPUT = `[name=fileInput]`;
exports.PATH_FIXTURES = join( __dirname, "/../", "/fixtures/" );
exports.SEL_FORM_ERROR = `.alert-danger`;
exports.SEL_JUMBOTRON_DESC = `.jumbotron p.gt-small`;
exports.BASE_URL = process.env.URL || "http://localhost:8080";
exports.PATH_SCREENSHOTS = join( __dirname, "/../", "/screenshots/" );
exports.ASYNC_TRANSITION_TIMEOUT = 200;
exports.NETWORK_TIMEOUT = 60000;
exports.NAVIGATION_TIMEOUT = 45000;