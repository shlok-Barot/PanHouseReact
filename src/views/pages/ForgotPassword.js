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

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailID: "",
      Emailvalidation: "",
    };
    this.Auth = new AuthService();
  }

  /// --------------API Function Start------------------
  /// handle forgotpassword User
  handleForgotPassword = (e) => {
    e.preventDefault();
    let self = this;
    if (this.state.emailID !== "") {
      this.Auth.UserForgotPassword(this.state.emailID)
        .then((res) => {
          let status = res.data.message;
          if (status === "Success") {
            notification.success({
              message: "Success",
              description: "Please check your mail.",
              duration: 3,
            });
            self.setState({
              emailID: "",
            });
          } else {
            notification.error({
              message: "Error",
              description: status,
              duration: 3,
            });
          }
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      self.setState({
        Emailvalidation: "Please Enter Email ID.",
      });
    }
  };
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
                <div className="systmSign">FORGOT PASSWORD</div>
              </div>
              <Form name="form" onSubmit={this.handleForgotPassword}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83 text-yellow" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Enter Your Email ID"
                      type="email"
                      //   autoComplete="new-email"
                      name="emailID"
                      value={this.state.emailID}
                      onChange={this.handleOnChange}
                      autoComplete="off"
                    />
                  </InputGroup>
                  {this.state.emailID.length === 0 && (
                    <p className="validationMsg">
                      {this.state.Emailvalidation}
                    </p>
                  )}
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    SUBMIT
                  </Button>
                </div>
              </Form>
              <Row>
                <Col xs="12">
                  <p className="text-muted txt-center">
                    <Link to="/auth/login" className="forgotPass">
                      TRY LOGIN AGAIN
                    </Link>
                  </p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default ForgotPassword;
