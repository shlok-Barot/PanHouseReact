import React from "react";
// import axios from "axios";
// import config from "./../../helpers/config";
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
// import { encryption } from "helpers/encryption";
import {
  NotificationContainer,
//   NotificationManager,
} from "react-notifications";
import { Link } from "react-router-dom";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailId: "",
      Emailvalidation: "",
    };
  }

  /// --------------API Function Start------------------
  /// handle forgotpassword User
  handleForgotPassword = (e) => {
    e.preventDefault();
    var self = this;
    if (this.state.emailID !== "") {
      alert("API CALL");
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
                <Row>
                  <Col xs="12">
                    <p className="text-muted txt-center">
                      <Link to="/auth/login" className="forgotPass">
                        TRY LOGIN AGAIN
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

export default ForgotPassword;
