import React from "react";
import PropTypes from "prop-types";
import { FrownOutlined } from '@ant-design/icons';

export default class ErrorBoundary extends React.Component {

  static displayName = "ErrorBoundary";

  static propTypes = {
    children: PropTypes.any
  }

  constructor( props ) {
    super( props );
    this.state = { hasError: false };
  }

  componentDidCatch( error ) {
    console.warn( error );
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if ( this.state.hasError ) {
      // You can render any custom fallback UI
      return ( <div className="critical-error">
        <h2><FrownOutlined /></h2>
        <h1>Opps! Something went wrong.</h1>
        <p>Please report the issue on { " " }
          <a href="mailto:contact@crytek.com">contact@crytek.com</a>
        </p>
      </div> );
    }
    return this.props.children;
  }
}
