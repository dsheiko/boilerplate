import React from "react";

export default function Image({ placeholder, alt, srcSet }) {
    return <img
      className="lazyload"
      alt={ alt }
      src={ placeholder.hasOwnProperty( "trace" ) ? placeholder.trace: placeholder.preview }
      data-srcset={ srcSet.map( ( img, inx ) => `${ img.src } ${ inx + 1}x` ).join( ", " ) }
      data-sizes="auto"
      />;
}