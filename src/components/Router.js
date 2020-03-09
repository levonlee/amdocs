import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Search from "./Search";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/search" component={Search} />
  </Switch>
);

export default Router;