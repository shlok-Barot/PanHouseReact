import React, { Component } from "react";
import {
  Row,
  Button,
  FormGroup,
  Input,
  Form,
  Col,
  //   CardHeader,
  CardBody,
} from "reactstrap";
import ReactAutocomplete from "react-autocomplete";
import CreditDebitService from "./../../APIService/CreditDebitService";
import { notification } from "antd";

export class CustDebit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CustNameAutoComplete: [],
      DebitCustName: {},
      selectDebitCust: 0,
      debitAmount: "",
      debitDetails: "",
      customerValidation: "",
      DebitAmountValidation: "",
    };
    this.CreditDebit = new CreditDebitService();
  }
  /// --------------API Call start------------------------
  /// handle get Customer name
  handleGetCustomerName(field, e) {
    let self = this;
    var SearchData = this.state.DebitCustName;

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
  /// handle Add Debit data
  handleAddDebitData(e) {
    e.preventDefault();
    var self = this;
    if (this.state.selectDebitCust > 0 && this.state.debitAmount !== "") {
      this.CreditDebit.AddDebitDetails(
        this.state.selectDebitCust,
        Number(this.state.debitAmount),
        this.state.debitDetails.trim()
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
              DebitCustName: {},
              selectDebitCust: 0,
              debitAmount: "",
              debitDetails: "",
              customerValidation: "",
              DebitAmountValidation: "",
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
        DebitAmountValidation: "Enter Amount",
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
      selectDebitCust: custId,
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
    };
    return (
      <>
        <CardBody>
          <Form name="form" onSubmit={this.handleAddDebitData.bind(this)}>
            <div className="debitFrom">
              <h3>DEBIT FORM</h3>
              <Row>
                <Col lg="3"></Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">Customer Name</label>
                    <ReactAutocomplete
                      wrapperStyle={{ display: "block" }}
                      menuStyle={dropMenuStyle}
                      getItemValue={(item) => item.customerName}
                      items={this.state.CustNameAutoComplete}
                      renderItem={(item, isHighlighted) => (
                        <div
                          style={{
                            background: isHighlighted ? "lightgray" : "white",
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
                      onChange={this.handleGetCustomerName.bind(this, "Debit")}
                      onSelect={this.HandleSelecteddata.bind(
                        this,
                        (item) => item.customerID,
                        "Debit"
                      )}
                      value={this.state.DebitCustName["Debit"]}
                    />
                    {this.state.selectDebitCust === 0 && (
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
                    <label className="form-control-label">Debit Amount</label>
                    <Input
                      className="form-control-alternative"
                      placeholder="Enter Debit Amount"
                      type="text"
                      name="debitAmount"
                      maxLength={5}
                      value={this.state.debitAmount}
                      onChange={this.handleAmountChange}
                      autoComplete="off"
                    />
                    {this.state.debitAmount.length === 0 && (
                      <p className="validationMsg">
                        {this.state.DebitAmountValidation}
                      </p>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="3"></Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label">Details</label>
                    <Input
                      className="form-control-alternative"
                      placeholder="Enter Details"
                      type="text"
                      name="debitDetails"
                      value={this.state.debitDetails}
                      onChange={this.handleInputOnchange}
                      autoComplete="off"
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
      </>
    );
  }
}

export default CustDebit;
