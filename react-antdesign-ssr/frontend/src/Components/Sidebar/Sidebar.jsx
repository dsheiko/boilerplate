import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import { ProjectOutlined } from '@ant-design/icons';
import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";

const { Sider } = Layout;

export default function Sidebar() {

     const menu = useSelector( ( state ) => state.app.menu ),
           items = menu.map(  project => ({ label: project, key: project, icon: <ProjectOutlined /> }) );

    return (<ErrorBoundary>
    <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          items={ items } />
      </Sider>
    </ ErrorBoundary>);
};