import React, { Component } from "react";
import { Table } from "antd";
// reactstrap components
import {
  Card,
  // CardHeader,
  Container,
  Row,
  Col,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Input,
  // CardBody,
  Form,
  // PaginationItem,
  // PaginationLink,
  // Progress,
  // UncontrolledTooltip,
} from "reactstrap";
import Modal from "react-responsive-modal";
import { Radio } from "antd";
import { DatePicker } from "antd";
// import moment from "moment";
// import Header from "components/Headers/Header.js";

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerListData: [
        {
          key: "1",
          customerName: "Bharat Barot",
          contactNo: 9898656578,
          emailID: "bharatbarot@gmail.com",
          isActive: "Active",
        },
        {
          key: "2",
          customerName: "Shlok Barot",
          contactNo: 5485856578,
          emailID: "shlokbarot@gmail.com",
          isActive: "InActive",
        },
        {
          key: "3",
          customerName: "Mayur Patel",
          contactNo: 7854786545,
          emailID: "mayurpatel@gmail.com",
          isActive: "Active",
        },
        {
          key: "4",
          customerName: "Demo user",
          contactNo: 7854712345,
          emailID: "demouser@gmail.com",
          isActive: "InActive",
        },
      ],
      EditCustomerMdl: false,
    };
  }
  /// handle Redirect Add new customer page
  handleRedirectAddCustPage() {
    this.props.history.push("/admin/addCustomer");
  }
  /// Handle close Add customer model
  handleEditCustomerMdlClose = () => {
    this.setState({
      EditCustomerMdl: false,
    });
  };
  /// Handle Open Add customer model
  handleEditcustomerMdlOpen() {
    this.setState({
      EditCustomerMdl: true,
    });
  }
  render() {
    return (
      <>
        {/* <Header /> */}
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <span className="mask bg-gradient-default opacity-8" />
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <Button
                  color="info"
                  onClick={this.handleRedirectAddCustPage.bind(this)}
                >
                  Add New Customer
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <div className="table-cntr raisereactTable tblResponsive">
                  <Table
                    dataSource={this.state.customerListData}
                    columns={[
                      {
                        title: "Customer Name",
                        dataIndex: "customerName",
                        key: "customerName",
                        columnWidth: 150,
                      },
                      {
                        title: "Contact No",
                        dataIndex: "contactNo",
                        key: "contactNo",
                      },
                      {
                        title: "Email ID",
                        dataIndex: "emailID",
                        key: "emailID",
                      },
                      {
                        title: "IsActive",
                        dataIndex: "isActive",
                        key: "isActive",
                      },
                      {
                        title: "Action",
                        key: "action",
                        render: (row, item) => {
                          return (
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow tbl-dropdown"
                                right
                              >
                                <DropdownItem
                                  onClick={this.handleEditcustomerMdlOpen.bind(
                                    this
                                  )}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          );
                        },
                      },
                    ]}
                  />
                </div>
              </Card>
            </div>
          </Row>
          <Modal
            onClose={this.handleEditCustomerMdlClose}
            open={this.state.EditCustomerMdl}
            modalId="editCustomerDetails"
            // overlayId="logout-ovrly"
          >
            <div className="p-15">
              <h3 className="text-muted">EDIT CUSTOMER</h3>
              <div>
                <Form>
                  <div>
                    <Row>
                      <Col lg="6">
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
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email ID
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Email ID"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-mobileNo"
                          >
                            Mobile Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-mobileNo"
                            placeholder="Mobile Number"
                            type="text"
                          />
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

                  <div>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label className="form-control-label">DOB</label>
                          <DatePicker
                            className="dobpicker"
                            format="DD-MM-YYYY"
                            disabledDate={this.DisabledFutureDate}
                            placeholder="Date Of Birth"
                            showToday={false}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
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
        </Container>
      </>
    );
  }
}

export default CustomerList;
