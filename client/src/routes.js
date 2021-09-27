import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import ConfirmEmail from "./views/examples/ConfirmEmail";
import EditProfile from "./views/examples/EditProfile";
import ResetPassword from "./views/examples/ResetPassword";
import ConfirmPassword from "./views/examples/ConfirmPassword";
import ResetPasswordSuccess from "./views/examples/ResetPasswordSuccess";
import HomePage from './home/index';
import Home from './layouts/Home.js';
import Call from './components/agoraMeet/Call'

var routes = [
  {
    path: "/home",
    name: "HomePage",
    icon: "ni ni-key-25 text-info",
    component: HomePage,
    layout: "",
    api: true
  },
  {
    path: "/Home",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: Home,
    layout: "/admin",
    api: false
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-bullet-list-67 text-red",
    component: Profile,
    layout: "/admin",
    api: false
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    api: true
  },
  {
    path: "/meet-with-mentor",
    name: "Meet with Mentor",
    icon: "ni ni-single-02 text-yellow",
    component: Call,
    layout: "/admin",
    api: true
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    api: true
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    api: true
  },
  {
    path: "/confirm-email/:id",
    name: "Confirm Email",
    icon: "ni ni-check-bold text-green",
    component: ConfirmEmail,
    layout: "/auth",
    api: true
  },
  {
    path: "/edit-profile",
    name: "Edit Profile",
    icon: "ni ni-ruler-pencil text-info",
    component: EditProfile,
    layout: "/admin",
    api: true
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    icon: "ni ni-folder-17 text-pink",
    component: ResetPassword,
    layout: "/auth",
    api: true
  },
  {
    path: "/confirm-password/:id",
    name: "Confirm Password",
    icon: "ni ni-folder-17 text-pink",
    component: ConfirmPassword,
    layout: "/auth",
    api: true
  },
  {
    path: "/reset-success",
    name: "Password Reset Confirmed",
    icon: "ni ni-folder-17 text-pink",
    component: ResetPasswordSuccess,
    layout: "/auth",
    api: false
  }
];
export default routes;
