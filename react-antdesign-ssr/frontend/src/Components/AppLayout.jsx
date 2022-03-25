import React from "react";
import PropTypes from "prop-types";
import ErrorBoundary  from "./ErrorBoundary";
import { Route, Switch } from "react-router-dom"
import Head  from "./Head/Head";
import Sidebar from "./Sidebar/Sidebar";
import SettingsProjectTable from "Components/Main/Settings/Project/SettingsProjectTable";
import SettingsProjectEditModal from "Components/Main/Settings/Project/SettingsProjectEditModal";

import { Spin, Layout } from "antd";

const { Content } = Layout;

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
