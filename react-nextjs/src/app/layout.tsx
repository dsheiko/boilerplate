
// @see https://ant.design/docs/react/v5-for-19
import "@ant-design/v5-patch-for-react-19";
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
  title: "Projects",
  description: "Demo app built with Next.js 15, Ant Design v5, and React Query v5.",
};

export default function RootLayout({
  children, modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <React.StrictMode>
          <ReactQueryProvider>
              <AntdRegistry>        
              
                  <Layout className="container-root">                    
                    <Navbar />
                      <Layout className="container-main">
                        <Sidebar  />
                        <Layout className="container-content">
                            <Content className="content" >
                              { children }
                              { modal }
                            </Content>
                        </Layout>
                      </Layout>
                      
                  </Layout>
              <div id="modal-root" />
              </AntdRegistry>
          </ReactQueryProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
