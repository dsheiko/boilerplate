import React from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "../ErrorBoundary";
import { ProjectOutlined } from '@ant-design/icons';
import { Layout, Menu, Icon } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actions from "~/Actions";

const { Content, Sider } = Layout,
      { SubMenu } = Menu;


// Mapping state to the props
const mapStateToProps = ( state ) => ({ store: state }),
      // Mapping actions to the props
      mapDispatchToProps = ( dispatch ) => ({
        actions: bindActionCreators( actions, dispatch )
      });

// Using store connect as a decorator
@connect( mapStateToProps, mapDispatchToProps )      
export default class Sidebar extends React.Component {

  static displayName = "Sidebar";  

  render() {
    const { store } = this.props;
    return (< ErrorBoundary>
    <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
        >

        { store.app.menu.map( ( project, inx ) => (<Menu.Item key={ inx }>
          <span><ProjectOutlined />{ project }</span>
        </Menu.Item>)) }

        </Menu>
      </Sider>
    </ ErrorBoundary>);
  }
};