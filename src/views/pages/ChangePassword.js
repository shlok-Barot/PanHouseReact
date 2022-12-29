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
  Col,
} from "reactstrap";
import { notification } from "antd";
import AuthService from "views/APIService/AuthService";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      oldPassValidation: "",
      newPassValidation: "",
      confirmPassValidation: "",
    };
    this.Auth = new AuthService();
  }

  /// --------------API Function Start------------------
  /// handle forgotpassword User
  handleUserChangePassword = () => {
    let self = this;

    this.Auth.UserChangePassword(this.state.oldPassword, this.state.newPassword)
      .then((res) => {
        debugger
        let status = res.data.message;
        if (status === "Success") {
          notification.success({
            message: "Success",
            description: "Password Change Successfully.",
            duration: 3,
          });
          self.setState({
            oldPassValidation: "",
            newPassValidation: "",
            confirmPassValidation: "",
          });
          setTimeout(() => {
            self.props.history.push("/auth/login");
          }, 500);
        } else {
          notification.error({
            message: "Error",
            description: "Password not changed. please try again",
            duration: 3,
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  /// --------------API Function End--------------------

  /// handle check new and confirm password
  hadnleCheckOdlNewPassword = (e) => {
    e.preventDefault();
    if (
      this.state.oldPassword !== "" &&
      this.state.newPassword !== "" &&
      this.state.confirmPassword !== ""
    ) {
      if (this.state.newPassword === this.state.confirmPassword) {
        this.handleUserChangePassword();
      } else {
        notification.error({
          message: "Error",
          description: "The new password and confirm password do not match.",
          duration: 4,
        });
      }
    } else {
      this.setState({
        oldPassValidation: "Please Enter Old Password.",
        newPassValidation: "Please Enter New Password.",
        confirmPassValidation: "Please Enter Confirm Password.",
      });
    }
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
                <div className="systmSign">CHANGE PASSWORD</div>
              </div>
              <Form name="form" onSubmit={this.hadnleCheckOdlNewPassword}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open text-primary" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Enter Old Password"
                      type="password"
                      name="oldPassword"
                      value={this.state.oldPassword}
                      onChange={this.handleOnChange}
                      autoComplete="off"
                    />
                  </InputGroup>
                  {this.state.oldPassword.length === 0 && (
                    <p className="validationMsg">
                      {this.state.oldPassValidation}
                    </p>
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open text-primary" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Enter New Password"
                      type="password"
                      name="newPassword"
                      value={this.state.newPassword}
                      onChange={this.handleOnChange}
                      autoComplete="off"
                    />
                  </InputGroup>
                  {this.state.newPassword.length === 0 && (
                    <p className="validationMsg">
                      {this.state.newPassValidation}
                    </p>
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open text-primary" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Enter Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleOnChange}
                      autoComplete="off"
                    />
                  </InputGroup>
                  {this.state.confirmPassword.length === 0 && (
                    <p className="validationMsg">
                      {this.state.confirmPassValidation}
                    </p>
                  )}
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="my-4 btnSubmitWdt"
                    color="primary"
                    type="submit"
                  >
                    SET PASSWORD
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default ChangePassword;
