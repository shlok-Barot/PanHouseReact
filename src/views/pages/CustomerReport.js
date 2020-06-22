import React, { Component } from "react";
import Header from "components/Headers/Header";
import { Table } from "antd";
import {
  Card,
  Container,
  Row,
  Button,
  FormGroup,
  Input,
  Form,
  Col,
} from "reactstrap";
import Modal from "react-responsive-modal";

class CustomerReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerReportData: [
        {
          key: "1",
          customerName: "Bharat Barot",
          debit: "₹ 450",
          credit: "",
        },
        {
          key: "2",
          customerName: "Shlok Barot",
          debit: "",
          credit: "₹ 320",
        },
        {
          key: "3",
          customerName: "Mayur Patel",
          debit: "₹ 400",
          credit: "",
        },
        {
          key: "4",
          customerName: "Demo user",
          debit: "",
          credit: "₹ 565",
        },
      ],
      DebitMdl: false,
      creditMdl: false,
    };
  }

  /// handle Debit Modal Open
  handleDebitModalOpen() {
    this.setState({
      DebitMdl: true,
    });
  }
  /// handle Debit Modal Close
  handleDebitModalClose = () => {
    this.setState({
      DebitMdl: false,
    });
  };
  /// handle Credit modal open
  handleCreditModalOpen = () => {
    this.setState({
      creditMdl: true,
    });
  };
  /// handle Credit modal close
  handleCreditModalClose = () => {
    this.setState({
      creditMdl: false,
    });
  };
  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <div className="table-cntr raisereactTable tblResponsive">
                  <Table
                    dataSource={this.state.customerReportData}
                    columns={[
                      {
                        title: "Customer Name",
                        dataIndex: "customerName",
                        key: "customerName",
                        columnWidth: 100,
                      },
                      {
                        title: "Debit",
                        dataIndex: "debit",
                        key: "debit",
                        render: (row, item) => {
                          return (
                            <div>
                              {item.debit !== "" && (
                                <span className="table-btn red">
                                  {item.debit}
                                </span>
                              )}
                            </div>
                          );
                        },
                      },
                      {
                        title: "Credit",
                        dataIndex: "credit",
                        key: "credit",
                        render: (row, item) => {
                          return (
                            <div>
                              {item.credit !== "" && (
                                <span className="table-btn green">
                                  {item.credit}
                                </span>
                              )}
                            </div>
                          );
                        },
                      },
                      {
                        title: "Action",
                        key: "action",
                        render: (row, item) => {
                          return (
                            <Button
                              color="primary"
                              className="btnEdit"
                              onClick={(e) => e.preventDefault()}
                            >
                              Report
                            </Button>
                          );
                        },
                      },
                    ]}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true }}
                    showSizeChanger={true}
                    onShowSizeChange={true}
                  />
                </div>
              </Card>
              <Modal
                onClose={this.handleDebitModalClose}
                open={this.state.DebitMdl}
                modalId="editCustomerDetails"
                // overlayId="logout-ovrly"
              >
                <div className="p-15">
                  <h3 className="text-muted">DEBIT FORM</h3>
                  <div>
                    <Form>
                      <div>
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-fullname"
                              >
                                Full Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-fullname"
                                placeholder="Full Name"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Amount
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-email"
                                placeholder="Email ID"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Address
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-address"
                                placeholder="Address"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <FormGroup className="txt-center">
                          <Button
                            color="primary"
                            onClick={(e) => e.preventDefault()}
                          >
                            Submit
                          </Button>
                        </FormGroup>
                      </div>
                    </Form>
                  </div>
                </div>
              </Modal>
              <Modal
                onClose={this.handleCreditModalClose}
                open={this.state.creditMdl}
                modalId="editCustomerDetails"
                // overlayId="logout-ovrly"
              >
                <h3>Credit Form</h3>
              </Modal>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default CustomerReport;
