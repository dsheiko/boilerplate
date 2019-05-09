import React from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "../ErrorBoundary";

import {  Layout, Menu, Icon } from "antd";
const { Content, Sider } = Layout,
      { SubMenu } = Menu;

export default class Sidebar extends React.Component {

  static displayName = "Sidebar";  

  render() {
    const { store } = this.props;
    return (<Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
        >

        { store.app.menu.map( ( project, inx ) => (<Menu.Item key={ inx }>
          <span><Icon type="project" />{ project }</span>
        </Menu.Item>)) }

        </Menu>
      </Sider>);
  }
};