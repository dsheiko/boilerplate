import React from "react";
import { FrownOutlined } from "@ant-design/icons";
import { ErrorBoundary } from "react-error-boundary";

export default ( props ) =>  <ErrorBoundary fallback={ (<div className="critical-error">
        <h2><FrownOutlined /></h2>
        <h1>Opps! Something went wrong.</h1>
      </div>) }>
      { props.children }
    </ErrorBoundary>;