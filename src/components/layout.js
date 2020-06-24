import React, { Component } from "react";
import Sidebar from "./Sidebar/Sidebar";
import AdminNavbar from "./Navbars/AdminNavbar";
import AdminFooter from "./Footers/AdminFooter";
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";
import routes from "routes.js";
import addCustomer from "views/pages/addCustomer";
import dashboard from "views/dashboard";
import CustomerList from "views/pages/CustomerList";
import Icons from "views/pages/Icons";
import Profile from "views/pages/Profile";
import CustomerReport from "views/pages/CustomerReport";
import CreditAndDebit from "views/pages/CreditAndDebit";
import DemoTest from "views/pages/DemoTest";

export class layout extends Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return false;
  };
  render() {
    const { children } = this.props;
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/dashboard",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "...",
          }}
        />

        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            <Route path={"/admin/dashboard"} component={dashboard} />
            <Route path={"/admin/addCustomer"} component={addCustomer} />
            <Route path={"/admin/customerList"} component={CustomerList} />
            <Route path={"/admin/icons"} component={Icons} />
            <Route path={"/admin/user-profile"} component={Profile} />
            <Route path={"/admin/customerReport"} component={CustomerReport} />
            <Route path={"/admin/credit-debit"} component={CreditAndDebit} />
            <Route path={"/admin/DemoTest"} component={DemoTest} />
          </Switch>
          <Container fluid>
            {children}
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default layout;
