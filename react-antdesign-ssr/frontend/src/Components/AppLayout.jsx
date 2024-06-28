import React from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component"
import ErrorBoundary  from "./ErrorBoundary";
import { Route, Switch } from "react-router-dom"
import { Spin, Layout } from "antd";

const { Content } = Layout,
      Head = loadable(() => import( "./Head/Head" )),
      Sidebar = loadable(() => import( "./Sidebar/Sidebar" )),
      SettingsProjectTable = loadable(() => import( "~/Components/Main/Settings/Project/SettingsProjectTable" )),
      SettingsProjectEditModal = loadable(() => import( "~/Components/Main/Settings/Project/SettingsProjectEditModal" ));


export default class AppLayout extends React.Component {

  static displayName = "AppLayout";

  static propTypes = {
    actions: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const { actions, store, selectors } = this.props;

    return (
      <ErrorBoundary>
        <Spin spinning={ store.app.loading } size="large">
           <Layout className="container-root">
            <Head actions={ actions } store={ store } />
            <Layout style={ { "flexDirection": "row" } }>

              <Sidebar store={ store } />
              <Layout className="container-main">
                <Content  className="container-main__content">
                <Switch>

                    <Route path="/" exact render={() => (
                      <SettingsProjectTable actions={ actions } store={ store } baseUrl="/settings/project" />
                    )} />


                    <Route path="/settings/project/:pk" render={({ history, match }) => (
                      <SettingsProjectEditModal
                          table={ SettingsProjectTable.displayName }
                          pk={ parseInt( match.params.pk, 10 ) }
                          baseUrl="/settings/project"
                          history={ history }
                          actions={ actions }
                          store={ store }  />
                    )} />

                    <Route path="/settings/project" render={() => (
                      <SettingsProjectTable actions={ actions } store={ store } baseUrl="/settings/project" />
                    )} />
                </Switch>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Spin>
      </ErrorBoundary>
    );
  }
};
