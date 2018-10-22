// Requesting NPM module
import ConsoleLogHTML from "console-log-html";
// Requesting module by relative path
import { utilFoo } from "./util/foo";
// Requesting module by absolute path (see Webpack resolve option)
import { utilBar } from "util/bar";

// Redirecting log message to HTML
ConsoleLogHTML.connect( document.querySelector( "#log" ) );

console.log( "Compiled modules exports ", utilFoo(), utilBar() );

// Requesting modules async
Promise.all([
  import( /* webpackChunkName: "foo" */ "./widget/foo" ),
  import( /* webpackChunkName: "bar" */ "./widget/bar" )
]).then( ([{ widgetFoo }, { widgetBar }])  => {
  console.log( "Lazy-loaded modules exports ", widgetFoo(), widgetBar() );
}).catch( ( e )=> {
  console.error( e );
});