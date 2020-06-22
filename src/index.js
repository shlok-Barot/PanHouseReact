import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "react-notifications/lib/notifications.css";
import "./assets/css/customMaster.css";
import "antd/dist/antd.css";
import "react-responsive-modal/styles.css";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "./../src/components/layout";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
