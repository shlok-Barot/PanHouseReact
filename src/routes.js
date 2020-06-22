import dashboard from "views/dashboard.js";
import Profile from "views/pages/Profile.js";
import CustomerList from "views/pages/CustomerList.js";
import Icons from "views/pages/Icons.js";
import CustomerReport from "views/pages/CustomerReport";
import CreditAndDebit from "views/pages/CreditAndDebit";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: dashboard,
    layout: "/admin",
  },
  {
    path: "/customerList",
    name: "Customer List",
    icon: "ni ni-bullet-list-67 text-red",
    component: CustomerList,
    layout: "/admin",
  },
  {
    path: "/credit-debit",
    name: "Credit & Debit",
    icon: "ni ni-credit-card text-blue",
    component: CreditAndDebit,
    layout: "/admin",
  },
  {
    path: "/customerReport",
    name: "Customer Report",
    icon: "ni ni-book-bookmark text-orange",
    component: CustomerReport,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "My Profile",
    icon: "ni ni-circle-08 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  // {
  //   path: "/login",
  //   name: "LogOut",
  //   icon: "ni ni-button-power text-red",
  //   component: Login,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  // },
];
export default routes;
