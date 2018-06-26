import React from "react";
import PropTypes from "prop-types";

export default class ErrorBoundary extends React.Component {

  static propTypes = {
    children: PropTypes.any.isRequired
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
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
