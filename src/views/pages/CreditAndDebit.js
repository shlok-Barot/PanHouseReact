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

class CreditAndDebit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SelTabs: "Credit",
      CustNameAutoComplete: [],
      customerNameItem: {},
      creditAmount: "",
      debitAmount: "",
      creditDetails: "",
      debitDetails: "",
      selectedCustomer: 0,   
    };
  }
  /// --------------API Call start------------------------
  /// handle get Customer name
  handleGetCustomerName(field, e) {
    // let self = this;
    let SearchData = this.state.custData;
    SearchData[field] = e.target.value;

    var data = SearchData[field];
    this.setState({
      CustNameAutoComplete: data,
    });
  }

  
  /// --------------API Call End--------------------------

  /// handle Selected Data
  HandleSelecteddata(e, field, value, id) {
    debugger;
    let SearchData = this.state.SearchData;
    SearchData[field] = value;

    var custId = id.customerID;

    this.setState({
      SearchData,
      selectedCustomer: custId,
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
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
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
                        <Form>
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
                                    getItemValue={(item) => item.customerName}
                                    items={this.state.CustNameAutoComplete}
                                    renderItem={(item, isHighlighted, i) => (
                                      <div
                                        style={{
                                          background: isHighlighted
                                            ? "lightgray"
                                            : "white",
                                        }}
                                        value={item.customerID}
                                        key={i}
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
                                      "customer"
                                    )}
                                    onSelect={this.HandleSelecteddata.bind(
                                      this,
                                      (item) => item.customerID,
                                      "customer"
                                    )}
                                    value={
                                      this.state.customerNameItem["customer"]
                                    }
                                  />
                                  
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
                                    value={this.state.creditAmount}
                                    onChange={this.handleAmountChange}
                                  />
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
                                    value={this.state.creditDetails}
                                    onChange={this.handleInputOnchange}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <div className="pl-lg-4">
                              <FormGroup className="txt-center">
                                <Button
                                  color="primary"
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Submit
                                </Button>
                              </FormGroup>
                            </div>
                          </div>
                        </Form>
                      </CardBody>
                    </Tab>
                    <Tab label="Debit">
                      <CardBody>
                        <Form>
                          <div className="debitFrom">
                            <h3>DEBIT FORM</h3>
                            <Row>
                              <Col lg="3"></Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label className="form-control-label">
                                    Customer Name
                                  </label>
                                  <ReactAutocomplete
                                    wrapperStyle={{ display: "block" }}
                                    getItemValue={(item) => item.customerName}
                                    items={this.state.CustNameAutoComplete}
                                    renderItem={(item, isHighlighted, i) => (
                                      <div
                                        style={{
                                          background: isHighlighted
                                            ? "lightgray"
                                            : "white",
                                        }}
                                        value={item.customerID}
                                        key={i}
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
                                      "customer"
                                    )}
                                    onSelect={this.HandleSelecteddata.bind(
                                      this,
                                      (item) => item.customerID,
                                      "customer"
                                    )}
                                    value={
                                      this.state.customerNameItem["customer"]
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="3"></Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label className="form-control-label">
                                    Debit Amount
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    placeholder="Enter Debit Amount"
                                    type="text"
                                    name="debitAmount"
                                    maxLength={5}
                                    value={this.state.debitAmount}
                                    onChange={this.handleAmountChange}
                                  />
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
                                    name="debitDetails"
                                    value={this.state.debitDetails}
                                    onChange={this.handleInputOnchange}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <div className="pl-lg-4">
                              <FormGroup className="txt-center">
                                <Button
                                  color="primary"
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Submit
                                </Button>
                              </FormGroup>
                            </div>
                          </div>
                        </Form>
                      </CardBody>
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
