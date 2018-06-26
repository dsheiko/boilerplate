import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Main from "../Components/Main.jsx";
import * as Actions from "../Actions";

// Mapping state to the props
const mapStateToProps = ( state ) => ({ states: state }),
      // Mapping actions to the props
      mapDispatchToProps = ( dispatch ) => ({
        actions: bindActionCreators( Actions, dispatch )
      });
// Using store connect as a decorator
@connect( mapStateToProps, mapDispatchToProps )
export default class App extends Component {
  render() {
    return (
      <Main {...this.props} />
    );
  }
}