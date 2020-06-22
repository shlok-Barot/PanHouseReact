import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";
import Login from "./../views/pages/Login";
import ForgotPassword from "views/pages/ForgotPassword";
// import routes from "routes.js";

class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
 
  render() {
    return (
      <Fragment>
        <div className="main-content">
          <div className="header bg-gradient-info py-7 py-lg-8">
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Switch>
                <Route path={"/auth/login"} component={Login} />
                <Route path={"/auth/forgotpassword"} component={ForgotPassword} />
              </Switch>
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default Auth;
