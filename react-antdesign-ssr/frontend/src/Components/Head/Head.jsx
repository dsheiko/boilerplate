import React from "react";
import { Layout, Divider } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "~/Store/app";

const { Header } = Layout;

export default () => {
  // Example of accessing store and using actions 
  const username = useSelector( state => state.app.username ),
        dispatch = useDispatch();
        
return (<Header style={{
          display: "flex",
          alignItems: "center",
        }}>
    <a className="logo">
      <DesktopOutlined />
    </a>
    <div style={{ color: "white" }}>
      { username ? <>
        { username }
        <Divider type="vertical" />
        <a onClick={() => dispatch( logout() )}>logout</a>
      </> : <a onClick={() => dispatch( login( "Jon Doe" ) )}>login</a> }
    </div>
  </Header>);
}