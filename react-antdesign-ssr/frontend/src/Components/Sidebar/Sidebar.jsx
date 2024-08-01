import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import { ProjectOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

const { Sider } = Layout,
       menu = [ "Item1" ];

export default function Sidebar() {
     const items = menu.map(  project => ({ label: project, key: project, icon: <ProjectOutlined /> }) );

    return (<ErrorBoundary>
    <Sider width={200} style={{ background: "#fff" }}>
        <Menu
          mode="inline"
          style={{ height: "100%", borderRight: 0 }}
          items={ items } />
      </Sider>
    </ ErrorBoundary>);
};