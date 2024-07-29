import React from "react";
import loadable from "@loadable/component";
import { Outlet } from "react-router-dom";
import { Spin, Layout } from "antd";
import Fallback from "~/Components/Fallback";
import Head from "~/Components/Head/Head";
import Sidebar from "~/Components/Sidebar/Sidebar";
import SettingsProjectTable from "~/Components/Main/Settings/Project/SettingsProjectTable";

const { Content } = Layout;
      // Head = loadable(() => import( "~/Components/Head/Head" ));
      // Sidebar = loadable(() => import( "~/Components/Sidebar/Sidebar" )),
      // SettingsProjectTable = loadable(() => import( "~/Components/Main/Settings/Project/SettingsProjectTable" ));

function NotFound() {
  return <p>Not Found</p>;
}
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
          element:  <SettingsProjectTable />
          // 
          // Component: () => {
          //     const { pk } = useParams(),
          //           navigate = useNavigate();                 
          //     return (<SettingsProjectEditModal
          //         table={ "SettingsProjectTable" }
          //         pk={ parseInt( pk, 10 ) }
          //         baseUrl="/settings/project"
          //         navigate={ navigate }  />)
          //   },
          //lazy: () => loadable(() => import( "~/Components/Sidebar/Sidebar" ))       
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
        <Spin spinning={ false } size="large">
           <Layout className="container-root">
            <Head />
            <Layout style={ { "flexDirection": "row" } }>

              <Sidebar  />
              <Layout className="container-main">
                <Content  className="container-main__content">
                 <Outlet />
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Spin>
      </React.StrictMode>
    );
};
