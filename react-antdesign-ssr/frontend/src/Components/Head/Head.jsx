import React from "react";
import {  Layout } from "antd";
const { Header } = Layout;
import { DesktopOutlined } from '@ant-design/icons';

export default () => (<Header className="header">
    <a className="logo">
      <DesktopOutlined />
    </a>
  </Header>);