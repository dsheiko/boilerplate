
import React from "react";
import type { Metadata } from "next";
import { Layout } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import Navbar from "@/ui/Navbar/Navbar";
import Sidebar from "@/ui/Sidebar/Sidebar";
import { Content } from "antd/lib/layout/layout";
import "./index.scss";

export const metadata: Metadata = {
  title: "Projects Demo App",
  description: "An example app",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
      </head>
      <body>
        <React.StrictMode>
          <ReactQueryProvider>
              <AntdRegistry>        
              
                  <Layout className="container-root">          
                    
                    <Navbar />

                      <Layout style={ { "flexDirection": "row" } }>

                        <Sidebar  />
                        <Layout style={{
                              padding: "0 24px 24px",
                            }}>
                            <Content  style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280
                              }} >
                              { children }
                            </Content>
                        </Layout>
                      </Layout>
                      
                  </Layout>
              
              </AntdRegistry>
          </ReactQueryProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
