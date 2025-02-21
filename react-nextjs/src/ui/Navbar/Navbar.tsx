import React from "react";
import { Divider } from "antd";
import { Header } from "antd/lib/layout/layout";
import { DesktopOutlined } from "@ant-design/icons";

const AppHeader: React.FC = () => (<Header style={{
          display: "flex",
          alignItems: "center",
        }}>
    <a className="logo">
      <DesktopOutlined />
    </a>
    <div style={{ color: "white" }}>      
        John Doe
        <Divider type="vertical" />
        <a>logout</a>
      
    </div>
  </Header>);

export default AppHeader;  
