import { Pipeline } from "./pipeline/index";
import { events } from "./events";
import { byTypes } from "./pipeline/filter";
import { toSummary } from "./pipeline/format";

const pipeline = new Pipeline()
  .add( byTypes( "click", "input" ) )
  .add( toSummary );

const processed = pipeline.run( events );

import( /* webpackChunkName: "renderer" */ "./renderer/index" )
  .then( ( { render } ) => render( events, processed ) )
  .catch( console.error );
