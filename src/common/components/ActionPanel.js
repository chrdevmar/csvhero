import React, { Component, Suspense } from 'react'
import '../styles/ActionPanel.css';

import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Loader } from 'semantic-ui-react';

import NavItems from './NavItems';

const Filter = React.lazy(() => import('../../filter/containers/Filter'));
const Edit = React.lazy(() => import('../../edit/containers/Edit'));
const Visualise = React.lazy(() => import('../../visualise/containers/Visualise'));
const Export = React.lazy(() => import('../../export/containers/Export'));

class ActionPanel extends Component {
  render() {
    return (
      <Router>
        <NavItems/>
        <div className="action-panel-content">
          <Switch>
            <Route path="/app/filter" exact render={() => (
              <Suspense fallback={<Loader active inline="centered"/>}>
                <Filter/>
              </Suspense>
            )} />
            <Route path="/app/edit" exact render={() => (
              <Suspense fallback={<Loader active inline="centered"/>}>
                <Edit/>
              </Suspense>          
            )} />
            <Route path="/app/visualise" exact render={() => (
              <Suspense fallback={<Loader active inline="centered"/>}>
                <Visualise/>
              </Suspense>
            )} />
            <Route path="/app/export" exact render={() => (
              <Suspense fallback={<Loader active inline="centered"/>}>
                <Export/>
              </Suspense>
            )} />
            <Route path="/app" render={() => (<Redirect to="/app/filter"></Redirect>)}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default ActionPanel;