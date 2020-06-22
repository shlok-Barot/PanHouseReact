import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Radio } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import Header from "components/Headers/Header.js";

class addCustomer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customerFullName: "",
      EmailId: "",
      mobileNo: "",
      genderID: 1,
      custAddress: "",
      Dob: "",
      fullNameValidation: "",
      mobileNoValidation: "",
    };
  }
  /// -----------------API function start-------------------------
  /// handle Submit tcustomer data
  handleSubmitCustomerData() {
    var self = this;
    if (this.state.customerFullName !== "" && this.state.mobileNo !== null) {
      console.log(
        this.state.customerFullName,
        this.state.EmailId,
        this.state.mobileNo,
        this.state.genderID,
        this.state.Dob,
        this.state.custAddress
      );
    } else {
      self.setState({
        fullNameValidation: "Please Enter Name.",
        mobileNoValidation: "Please Enter Mobile No.",
      });
    }
  }
  /// -----------------API function end---------------------------
  /// gender change
  genderSelect = (e) => {
    this.setState({
      genderID: e.target.value,
    });
  };
  //hanlde DOB change
  handleDobChange = (date) => {
    this.setState({
      Dob: date,
    });
  };
  /// disabled future date
  DisabledFutureDate = (current) => {
    return current && current > moment().startOf("day");
  };
  /// handle Input onchange
  handleInputOnchange = (e) => {
    var name = e.target.name;
    var reg = /^[0-9\b]+$/;
    if (name === "mobileNo") {
      if (e.target.value === "" || reg.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      } else {
        e.target.value = "";
      }
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="mb-0 txt-center">Customer Form</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Customer Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label className="form-control-label">
                              Full Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Full Name"
                              type="text"
                              name="customerFullName"
                              maxLength={100}
                              autoComplete="off"
                              value={this.state.customerFullName}
                              onChange={this.handleInputOnchange}
                            />
                            {this.state.customerFullName.length === 0 && (
                              <p className="validationMsg">
                                {this.state.fullNameValidation}
                              </p>
                            )}
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label className="form-control-label">
                              Email ID
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Email ID"
                              type="email"
                              name="EmailId"
                              autoComplete="off"
                              maxLength={100}
                              value={this.state.EmailId}
                              onChange={this.handleInputOnchange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label className="form-control-label">
                              Mobile Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Mobile Number"
                              type="text"
                              name="mobileNo"
                              autoComplete="off"
                              maxLength={10}
                              value={this.state.mobileNo}
                              onChange={this.handleInputOnchange}
                            />
                            {this.state.mobileNo.length === 0 && (
                              <p className="validationMsg">
                                {this.state.mobileNoValidation}
                              </p>
                            )}
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label className="form-control-label">Gender</label>
                            <div className="m-t-10">
                              <Radio.Group
                                onChange={this.genderSelect}
                                value={this.state.genderID}
                              >
                                <Radio value={1}>Male</Radio>
                                <Radio value={2}>Female</Radio>
                              </Radio.Group>
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                    <div className="pl-lg-4">
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label className="form-control-label">DOB</label>
                            <DatePicker
                              className="dobpicker"
                              format="DD-MM-YYYY"
                              disabledDate={this.DisabledFutureDate}
                              placeholder="Date Of Birth"
                              showToday={false}
                              value={this.state.Dob}
                              onChange={this.handleDobChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label className="form-control-label">
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Address"
                              type="text"
                              name="custAddress"
                              autoComplete="off"
                              maxLength={200}
                              value={this.state.custAddress}
                              onChange={this.handleInputOnchange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                    <div className="pl-lg-4">
                      <FormGroup className="txt-center">
                        <Button
                          color="primary"
                          onClick={this.handleSubmitCustomerData.bind(this)}
                        >
                          Submit
                        </Button>
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default addCustomer;
