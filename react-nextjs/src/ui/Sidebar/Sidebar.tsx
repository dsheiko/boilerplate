import React from "react";
import { ProjectOutlined } from "@ant-design/icons";
import {  Menu } from "antd";
import type { MenuProps } from 'antd';
import Sider from "antd/lib/layout/Sider";

const menu = [ "Item1" ];

const Sidebar: React.FC = () => {
    const items: MenuProps[ "items" ] = menu.map( project => ({ 
      label: project, 
      key: project, 
      icon: <ProjectOutlined /> 
    }) );

    return ( <Sider width={ 200 } style={{ background: "#fff" }}>
        <Menu
          mode="inline"
          style={{ height: "100%", borderRight: 0 }}
          items={ items } />
      </Sider> );
};

export default Sidebar;