import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Provider} from 'react-redux'
import store from './reducer/rootReducer'
import RootApp from './main'
import Analytics from './src/analytics'
import Tables from './src/table'
import AdminPanel from './src/admin.panel';
import CombainsTable from './src/combaines';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Provider store={store}>
            <Switch>
              <Route path="/tables" >
                <Tables />
              </Route>
              <Route path="/analytics">
                <Analytics />
              </Route>
              <Route path="/admin">
                <AdminPanel />
              </Route>
              <Route path="/combaines">
                <CombainsTable />
              </Route>
              <Route path="/">
                <RootApp />
              </Route>
            </Switch>
          </Provider>
        </div>
      </BrowserRouter>
    );
  }
}