import React, { Component } from "react";
import Header from "components/Headers/Header";
import { Table,notification } from "antd";
import {
  Card,
  Container,
  Row,
  Button,
  // FormGroup,
  // Input,
  // Form,
  // Col,
} from "reactstrap";
import CreditDebitService from "./../APIService/CreditDebitService";

class CustomerReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerReportData: [],
      paginationBottom: "bottomCenter",
    };
    this.CreditDebit = new CreditDebitService();
  }

  componentDidMount() {
    this.handleGetCreditDebitGrid();
  }

  /// --------------API function start-------------------------
  
  /// Get credit debit grid data
  handleGetCreditDebitGrid() {
    var self = this;
    this.CreditDebit.GetCreditDebitGriddata()
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ customerReportData: data });
        } else {
          self.setState({ customerReportData: [] });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }

  /// share customer report
  handleShareCustomerReport(customer_Id){
    // var self = this;
    this.CreditDebit.ShareCustomerReport(customer_Id)
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          window.open("//" + data, "_blank");
        } else {
          notification.error({
            message: "Error",
            description: "Server temporarily not available.",
            duration: 3,
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  /// --------------API function end---------------------------
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
                    rowKey="customerID"
                    columns={[
                      {
                        title: "Customer Name",
                        dataIndex: "customerName",
                        columnWidth: 100,
                        sortDirections: ["descend", "ascend"],
                        sorter: (a, b) =>
                          a.customerName.localeCompare(b.customerName),
                      },
                      {
                        title: "Credit",
                        dataIndex: "creditAmount",
                        sorter: (a, b) =>
                          a.creditAmount - b.creditAmount,
                        render: (row, item) => {
                          return (
                            <div>
                              {item.creditAmount !== "" && (
                                <span className="table-btn green">
                                  {item.creditAmount}
                                </span>
                              )}
                            </div>
                          );
                        },
                      },
                      {
                        title: "Debit",
                        dataIndex: "debitAmount",
                        sorter: (a, b) =>
                        a.debitAmount - b.debitAmount,
                        render: (row, item) => {
                          return (
                            <div>
                              {item.debitAmount !== "" && (
                                <span className="table-btn red">
                                  {item.debitAmount}
                                </span>
                              )}
                            </div>
                          );
                        },
                      },
                      {
                        title: "Extra Amount",
                        dataIndex: "extraCredit",
                        sorter: (a, b) =>
                        a.extraCredit - b.extraCredit,
                        columnWidth: 130,
                        render: (row, item) => {
                          return (
                            <div>
                              {item.extraCredit !== "" && (
                                <span className="table-btn green">
                                  {item.extraCredit}
                                </span>
                              )}
                            </div>
                          );
                        },
                      },
                      {
                        title: "Pending Amount",
                        dataIndex: "needToPay",
                        sorter: (a, b) =>
                        a.needToPay - b.needToPay,
                        columnWidth: 120,
                        render: (row, item) => {
                          return (
                            <div>
                              {item.needToPay !== "" && (
                                <span className="table-btn red">
                                  {item.needToPay}
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
                              onClick={this.handleShareCustomerReport.bind(this,item.customerID)}
                            >
                              Report
                            </Button>
                          );
                        },
                      },
                    ]}
                    pagination={{
                      defaultPageSize: 10,
                      showSizeChanger: true,
                      // position: [this.state.paginationBottom],
                    }}
                    showSizeChanger={true}
                    onShowSizeChange={true}
                  />
                </div>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default CustomerReport;
