import React, { Component } from "react";
import Header from "components/Headers/Header";
import {
  Card,
  Container,
  Row,
  Button,
  FormGroup,
  Input,
  Form,
  Col,
  //   CardHeader,
  CardBody,
} from "reactstrap";
import { Tabs, Tab } from "react-bootstrap-tabs/dist";
import ReactAutocomplete from "react-autocomplete";
import CreditDebitService from "./../APIService/CreditDebitService";
import CustDebit from "./Tabs/CustDebit";
import { notification } from "antd";

class CreditAndDebit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SelTabs: "Credit",
      CustNameAutoComplete: [],
      CreditCustName: {},
      creditAmount: "",
      creditDetails: "",
      selectCreditCust: 0,
      customerValidation: "",
      CreditAmountValidation: "",
    };
    this.CreditDebit = new CreditDebitService();
  }
  /// --------------API Call start------------------------
  /// handle get Customer name
  handleGetCustomerName(field, e) {
    let self = this;
    var SearchData = this.state.CreditCustName;
    SearchData[field] = e.target.value;

    if (SearchData[field].length > 2) {
      this.CreditDebit.GetCustomerName(SearchData[field])
        .then(function (res) {
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            self.setState({ CustNameAutoComplete: data });
          } else {
            self.setState({ CustNameAutoComplete: [] });
          }
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      this.setState({
        SearchData,
      });
    }
  }

  /// handle Add Credit data
  handleAddCreditData(e) {
    e.preventDefault();
    var self = this;
    if (this.state.selectCreditCust > 0 && this.state.creditAmount !== "") {
      this.CreditDebit.AddCreditDetails(
        this.state.selectCreditCust,
        Number(this.state.creditAmount),
        this.state.creditDetails.trim()
      )
        .then(function (res) {
          let status = res.data.message;
          if (status === "Success") {
            notification.success({
              message: "Success",
              description: "Record Added",
              duration: 3,
            });
            self.setState({
              CustNameAutoComplete: [],
              creditAmount: "",
              creditDetails: "",
              selectCreditCust: 0,
              CreditCustName: {},
              customerValidation: "",
              CreditAmountValidation: "",
            });
          } else {
            notification.error({
              message: "Error",
              description: "Record Not Added",
              duration: 3,
            });
          }
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      self.setState({
        customerValidation: "Select Customer Name",
        CreditAmountValidation: "Enter Amount",
      });
    }
  }

  /// --------------API Call End--------------------------

  /// handle Selected Data
  HandleSelecteddata(e, field, value, id) {
    var SearchData = this.state.SearchData;
    SearchData[field] = value;

    var custId = id.customerID;

    this.setState({
      SearchData,
      selectCreditCust: custId,
    });
  }
  /// handle Amount change
  handleAmountChange = (e) => {
    var reg = /^[0-9\b]+$/;
    if (e.target.value === "" || reg.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      e.target.value = "";
    }
  };

  /// handle Input onchange
  handleInputOnchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const dropMenuStyle = {
      left: "564.25px",
      top: "261px",
      minWidth: "100%",
      width: "100%",
      borderRadius: "3px",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 12px",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "2px 10px",
      fontSize: " 90%",
      overflow: "auto",
      maxHeight: "50",
      position: "initial !important",
      zIndex: "100000 !important",
      cursor: "pointer",
    };
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <div className="creditDebitForm">
                  <Tabs
                    onSelect={(index, label) =>
                      this.setState({ SelTabs: label })
                    }
                    selected={this.state.SelTabs}
                  >
                    <Tab label="Credit">
                      <CardBody>
                        <Form
                          name="form"
                          onSubmit={this.handleAddCreditData.bind(this)}
                        >
                          <div className="creditFrom">
                            <h3>CREDIT FORM</h3>
                            <Row>
                              <Col lg="3"></Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label className="form-control-label">
                                    Customer Name
                                  </label>
                                  <ReactAutocomplete
                                    wrapperStyle={{ display: "block" }}
                                    menuStyle={dropMenuStyle}
                                    getItemValue={(item) => item.customerName}
                                    items={this.state.CustNameAutoComplete}
                                    renderItem={(item, isHighlighted) => (
                                      <div
                                        style={{
                                          background: isHighlighted
                                            ? "lightgray"
                                            : "white",
                                        }}
                                        value={item.customerID}
                                        key={item.customerID}
                                      >
                                        {item.customerName}
                                      </div>
                                    )}
                                    renderInput={function (props) {
                                      return (
                                        <input
                                          className="autoCompleteInput"
                                          placeholder="Enter Customer Name"
                                          type="text"
                                          {...props}
                                        />
                                      );
                                    }}
                                    onChange={this.handleGetCustomerName.bind(
                                      this,
                                      "Credit"
                                    )}
                                    onSelect={this.HandleSelecteddata.bind(
                                      this,
                                      (item) => item.customerID,
                                      "Credit"
                                    )}
                                    value={this.state.CreditCustName["Credit"]}
                                  />
                                  {this.state.selectCreditCust === 0 && (
                                    <p className="validationMsg">
                                      {this.state.customerValidation}
                                    </p>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="3"></Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label className="form-control-label">
                                    Credit Amount
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    placeholder="Enter Credit Amount"
                                    type="text"
                                    name="creditAmount"
                                    maxLength={5}
                                    autoComplete="off"
                                    value={this.state.creditAmount}
                                    onChange={this.handleAmountChange}
                                  />
                                  {this.state.creditAmount.length === 0 && (
                                    <p className="validationMsg">
                                      {this.state.CreditAmountValidation}
                                    </p>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="3"></Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label className="form-control-label">
                                    Details
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    placeholder="Enter Details"
                                    type="text"
                                    name="creditDetails"
                                    autoComplete="off"
                                    value={this.state.creditDetails}
                                    onChange={this.handleInputOnchange}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <div className="pl-lg-4">
                              <FormGroup className="txt-center">
                                <Button color="primary" className="btnSubmit" type="submit">
                                  Submit
                                </Button>
                              </FormGroup>
                            </div>
                          </div>
                        </Form>
                      </CardBody>
                    </Tab>
                    <Tab label="Debit">
                      <CustDebit />
                    </Tab>
                  </Tabs>
                </div>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default CreditAndDebit;
