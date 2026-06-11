import { Pipeline } from "./pipeline/index";
import { events } from "./events";
import { byTypes } from "./pipeline/filter";
import { toSummary } from "./pipeline/format";
import type { AppEvent } from "./types";

const pipeline = new Pipeline<AppEvent[]>()
  .add( byTypes( "click", "input" ) );

const filtered = pipeline.run( events );
const processed = toSummary( filtered );

import( /* webpackChunkName: "renderer" */ "./renderer/index" )
  .then( ( { render } ) => render( events, processed ) )
  .catch( console.error );
