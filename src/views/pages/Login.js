import React from "react";
import axios from "axios";
import config from "./../../helpers/config";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { encryption } from "helpers/encryption";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailId: "",
      password: "",
    };
    this.handleAuthenticateUser = this.handleAuthenticateUser.bind(this);
  }

  /// --------------API Function Start------------------
  /// handle Authenticate User
  handleAuthenticateUser(e) {
    debugger;
    e.preventDefault();
    let self = this;
    var X_Authorized_userId = encryption(this.state.emailId, "enc");

    let X_Authorized_password = encryption(this.state.password, "enc");
    let X_Authorized_Domainname = encryption(window.location.origin, "enc");
    axios({
      method: "post",
      url: config.apiUrl + "/Account/authenticateUser",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Authorized-userId": X_Authorized_userId,
        "X-Authorized-password": X_Authorized_password,
        "X-Authorized-Domainname": X_Authorized_Domainname,
      },
    })
      .then(function (res) {
        var message = res.data.message;
        var data = res.data.responseData.token;
        if (message === "Valid Login") {
          window.localStorage.setItem("token", data);
          setTimeout(() => {
            self.props.history.push("/admin/dashboard");
          }, 400);
        } else {
          NotificationManager.error(
            "Username or password is invalid.",
            "",
            2000
          );
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  /// --------------API Function End--------------------
  /// handle Onchage
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <div className="systmSign">Sign In</div>
              </div>
              <Form name="form" onSubmit={this.handleAuthenticateUser}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83 text-yellow" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      name="emailId"
                      value={this.state.emailId}
                      onChange={this.handleOnChange}
                      // autoComplete="off"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open text-primary" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleOnChange}
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    LOGIN
                  </Button>
                </div>
                <Row>
                  <Col xs="12">
                    <p className="text-muted txt-center">
                      <Link to="/auth/forgotpassword" className="forgotPass">
                        FORGOT PASSWORD
                      </Link>
                    </p>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
          <NotificationContainer />
        </Col>
      </>
    );
  }
}

export default Login;
