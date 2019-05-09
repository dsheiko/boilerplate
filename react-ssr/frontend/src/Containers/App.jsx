import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppLayout from "../Components/AppLayout";
import actions from "Actions";

// Mapping state to the props
const mapStateToProps = ( state ) => ({ store: state }),
      // Mapping actions to the props
      mapDispatchToProps = ( dispatch ) => ({
        actions: bindActionCreators( actions, dispatch )
      });

// Using store connect as a decorator
@connect( mapStateToProps, mapDispatchToProps )
export default class App extends Component {

  static displayName = "App";

  async componentDidMount() {
    // Bootstrap
  }

  render() {
    const { actions, store } = this.props;
    return (
      <AppLayout actions={ actions } store={ store } />
    );
  }
}