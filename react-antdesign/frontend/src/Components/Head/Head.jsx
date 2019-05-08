import React from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "../ErrorBoundary";
import If from "../If";
import { Icon, Layout } from "antd";
const { Header } = Layout;

export default class Head extends React.Component {


  render() {

    return (<Header className="header">
    <a className="logo">
      <Icon type="desktop" />
    </a>


    </Header>);
  }
};