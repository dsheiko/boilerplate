import React from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component"
import ErrorBoundary  from "./ErrorBoundary";
import { Route, Routes, useParams, useNavigate } from "react-router-dom"
import { Spin, Layout } from "antd";
import SettingsProjectEditModal from "~/Components/Main/Settings/Project/SettingsProjectEditModal";

const { Content } = Layout,
      Head = loadable(() => import( "./Head/Head" )),
      Sidebar = loadable(() => import( "./Sidebar/Sidebar" )),
      SettingsProjectTable = loadable(() => import( "~/Components/Main/Settings/Project/SettingsProjectTable" ));

export default class AppLayout extends React.Component {

  static displayName = "AppLayout";

  static propTypes = {
    actions: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const { actions, store } = this.props;

    return (
      <ErrorBoundary>
        <Spin spinning={ store.app.loading } size="large">
           <Layout className="container-root">
            <Head actions={ actions } store={ store } />
            <Layout style={ { "flexDirection": "row" } }>

              <Sidebar store={ store } />
              <Layout className="container-main">
                <Content  className="container-main__content">
                <Routes>

                  
                    <Route index path="/" element={(
                      <SettingsProjectTable baseUrl="/settings/project" />
                    )} />


                    <Route path="/settings/project/:pk" Component={() => {
                      const { pk } = useParams(),
                            navigate = useNavigate();                       
                      return (<SettingsProjectEditModal
                          table={ SettingsProjectTable.displayName }
                          pk={ parseInt( pk, 10 ) }
                          baseUrl="/settings/project"
                          navigate={ navigate }  />)
                    }} />


                    <Route path="/settings/project" element={(
                      <SettingsProjectTable baseUrl="/settings/project" />
                    )} />

                </Routes>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Spin>
      </ErrorBoundary>
    );
  }
};
