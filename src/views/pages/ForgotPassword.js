import React from "react";
import axios from "axios";
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
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Link } from "react-router-dom";
import { authHeader } from "helpers/authHeader";
import config from "helpers/config";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailID: "",
      Emailvalidation: "",
    };
  }

  /// --------------API Function Start------------------
  /// handle forgotpassword User
  handleForgotPassword = (e) => {
    e.preventDefault();
    let self = this;
    if (this.state.emailID !== "") {
      axios({
        method: "post",
        url: config.apiUrl + "/Account/ForgetPassword",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          EmailId: this.state.emailID,
        },
      })
        .then((res) => {
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success("Please check your mail.", "", 2000);
            self.setState({
              emailID: "",
            });
          } else {
            NotificationManager.error(status, "", 2000);
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
          <NotificationContainer />
        </Col>
      </>
    );
  }
}

export default ForgotPassword;
