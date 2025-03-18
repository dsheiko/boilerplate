import React from "react";
import { Outlet } from "react-router-dom";
import { Spin, Layout } from "antd";
import { Helmet, HelmetProvider } from "react-helmet-async";
import loadable from "@loadable/component";
import Fallback from "~/Components/Fallback";
import Head from "~/Components/Head/Head";
import SettingsProjectTable from "~/Components/Main/Settings/Project/SettingsProjectTable";
import SettingsProjectEditModal from "~/Components/Main/Settings/Project/SettingsProjectEditModal";
import NotFound from "~/Components/NotFound";

// Example of prefetching https://loadable-components.com/docs/prefetching/ 
const Sidebar = loadable(() =>
  import(/* webpackPrefetch: true */ "~/Components/Sidebar/Sidebar" )
)

const { Content } = Layout;

// Describe routes for React Router v6+. On both server and client sides the routes will be supplied
// to *RouterProvider and resolve in <App> where the <Routes> section will be generated in the place of <Outlet />  
export function makeReactRoutes({ getProjects } = {}) {
  return [
    {
      path: "/",
      element: <App />,
      errorElement: <Fallback />,
      children: [
        {
          index: true,
          element:  <SettingsProjectTable />,
          ...( getProjects && { loader: async() => await getProjects() } )
          
        },
        {
          path: "/settings/project",
          element:  <SettingsProjectTable />,
          ...( getProjects && { loader: async() => await getProjects() } )
        },
        {
          path: "/settings/project/:pk",
          element:  <SettingsProjectEditModal /> 
        },
        {
          path: "*",
          element:  <NotFound />
        },
      ]
    }
  ];      
}

export default function App()  {
    return (
      <React.StrictMode>
        <HelmetProvider>
          <Helmet>
              <title>Demo App</title>
              <meta name="description" content="Demo app" />
          </Helmet>
          <Spin spinning={ false } size="large">
            <Layout className="container-root">
              <Head />
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
                  <Outlet />
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          </Spin>
        </HelmetProvider>
      </React.StrictMode>
    );
};
