import React from "react";
import { render } from "react-dom";
import Image from "./component/Image";
import "lazysizes/plugins/rias/ls.rias.js";
import "lazysizes";

import productImg1x from "./img/test-1x.jpg";
import productImg2x from "./img/test-2x.jpg";

render(
  <Image
      placeholder={ productImg1x }
      srcSet={[ productImg1x, productImg2x ]}
      alt="A farm"
      />,
  document.getElementById( "app" )
);
