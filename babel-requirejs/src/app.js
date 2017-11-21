// This will emulate a full ES2015+ environment 
import "../node_modules/babel-polyfill/dist/polyfill.min";

import { widgetFoo } from "./widget/foo";
import { widgetBar } from "./widget/bar";

console.log( "Lazy-loaded modules exports ", widgetFoo(), widgetBar() );
