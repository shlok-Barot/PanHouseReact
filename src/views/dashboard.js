import React from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import { connect } from "react-redux";
import { GetUserList } from "../actions/action";
import { Table, notification } from "antd";
import CreditDebitService from "./APIService/CreditDebitService";

class dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      CustReportLoader:false,
      customerReportData: [],
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
    this.CreditDebit = new CreditDebitService();
  }

  componentDidMount() {
    this.props.FetchUserList();
    this.handleGetCreditDebitGrid();
  }
  /// --------------API function start-------------------------
  /// Get credit debit grid data
  handleGetCreditDebitGrid() {
    var self = this;
    this.setState({
      CustReportLoader:true
    })
    this.CreditDebit.GetCreditDebitGriddata()
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ customerReportData: data,CustReportLoader:false });
        } else {
          self.setState({ customerReportData: [],CustReportLoader:false });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }

  /// share customer report
  handleShareCustomerReport(customer_Id) {
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
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1",
    });
  };
  /// handle page rediret
  handlePageRedirect() {
    this.props.history.push("/admin/customerReport");
  }
  render() {
    return (
      <>
        {/* Page content */}
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Traffic
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            350,897
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            New users
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            2,356
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Sales
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">924</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Performance
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            49,65%
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 12%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1,
                            })}
                            href="#pablo"
                            onClick={(e) => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2,
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={(e) => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={chartExample1[this.state.chartExample1Data]}
                      options={chartExample1.options}
                      getDatasetAtEvent={(e) => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Total orders</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Customer Reports</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={this.handlePageRedirect.bind(this)}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
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
                        sorter: (a, b) => a.creditAmount - b.creditAmount,
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
                        sorter: (a, b) => a.debitAmount - b.debitAmount,
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
                        sorter: (a, b) => a.extraCredit - b.extraCredit,
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
                        sorter: (a, b) => a.needToPay - b.needToPay,
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
                              onClick={this.handleShareCustomerReport.bind(
                                this,
                                item.customerID
                              )}
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
                    }}
                    size="middle"
                    loading={this.state.CustReportLoader}
                    showSizeChanger={true}
                    onShowSizeChange={true}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    FetchUserList: () => {
      dispatch(GetUserList());
    },
  };
};
export default connect(null, mapDispatchToProps)(dashboard);
