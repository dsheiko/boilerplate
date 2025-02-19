import React from "react";
import { Layout, Divider } from "antd";
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
      log in
    </div>
  </Header>);

export default AppHeader;  
