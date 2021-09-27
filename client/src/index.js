import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/argon-dashboard-react.css";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import CourseLayout from 'layouts/Course.js'
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthRoutes from "./components/PrivateRoute/AuthRoutes";
import Discussion from './components/Discussion/Discussion';
import Home from "layouts/Home";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/discussion" > <Discussion /> </Route>
      <Route path="/home"> <Home /> </Route>
      <PrivateRoute path="/admin" component={AdminLayout} />
      <PrivateRoute path="/course" component={CourseLayout} />
      <AuthRoutes path="/auth" component={AuthLayout} />
      <Redirect from="/" to="/course" component={CourseLayout} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
