import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from './services/auth';

import dataTable from "./pages/datatableAssessor/index";
import login from "./pages/singIn";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render = {props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to = {{ pathname: "/", state:{ from: props.locations } }} />
      )
    }

  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={login} />
      <Route exact path="/datatable" component={dataTable} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch> 
  </BrowserRouter>
);

//<PrivateRoute exact path="/datatable" component={dataTable} />

export default Routes;