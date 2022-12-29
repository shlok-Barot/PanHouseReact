import React from "react";
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
import { notification } from "antd";
import { Link } from "react-router-dom";
import AuthService from "views/APIService/AuthService";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailId: "",
      password: "",
      passwordHideShow: false,
    };
    this.handleAuthenticateUser = this.handleAuthenticateUser.bind(this);
    this.Auth = new AuthService();
  }

  /// --------------API Function Start------------------
  /// handle Authenticate User
  handleAuthenticateUser(e) {
    e.preventDefault();
    var self = this;
    this.Auth.AuthLogin(this.state.emailId, this.state.password)
      .then(function (res) {
        var message = res.data.message;
        var data = res.data.responseData.token;
        if (message === "Valid Login") {
          window.localStorage.setItem("token", data);
          setTimeout(() => {
            self.props.history.push("/admin/dashboard");
          }, 400);
        } else {
          notification.error({
            message: "Error",
            description: "Username or password is invalid.",
            duration: 3,
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }

  /// --------------API Function End--------------------
  handlehideShowPassword = () => {
    this.setState({
      passwordHideShow: !this.state.passwordHideShow,
    });
  };
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
                      type={this.state.passwordHideShow ? "text" : "password"}
                      autoComplete="new-password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleOnChange}
                    />
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i
                          className={
                            this.state.passwordHideShow
                              ? "fas fa-eye cursorPo text-blue"
                              : "fas fa-eye-slash cursorPo text-blue"
                          }
                          onClick={this.handlehideShowPassword}
                        />
                      </InputGroupText>
                    </InputGroupAddon>
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
        </Col>
      </>
    );
  }
}

export default Login;
