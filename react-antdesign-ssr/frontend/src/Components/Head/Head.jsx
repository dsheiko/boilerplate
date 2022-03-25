import React from "react";
import PropTypes from "prop-types";
import {  Layout } from "antd";
const { Header } = Layout;
import { DesktopOutlined } from '@ant-design/icons';

export default class Head extends React.Component {

  static displayName = "Head";

  render() {

    return (<Header className="header">
    <a className="logo">
      <DesktopOutlined />
    </a>


    </Header>);
  }
};