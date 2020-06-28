import React, { Component } from "react";
import { Table } from "antd";
import {
  Card,
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
} from "reactstrap";
import Modal from "react-responsive-modal";
import { Radio, notification } from "antd";
import CustService from "views/APIService/CustService";

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerListData: [],
      EditCustomerMdl: false,
      editCustData: {},
      customer_ID: 0,
      paginationBottom:"bottomCenter"
    };
    this.Cust = new CustService();
  }
  componentDidMount() {
    this.handleGetCustomerGridData();
  }

  ///-------------------API function start----------------------
  /// handle get customer grid data
  handleGetCustomerGridData() {
    var self = this;
    this.Cust.GetCustomerData()
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ customerListData: data });
        } else {
          self.setState({ customerListData: [] });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  /// Update Customer
  handleUpdateCustomer() {
    var self = this;
    this.Cust.UpdateCustomerDetils(
      this.state.customer_ID,
      this.state.editCustData.customerName,
      this.state.editCustData.customerEmailId,
      this.state.editCustData.customerPhoneNumber,
      this.state.editCustData.customerAddress,
      this.state.editCustData.gender,
      this.state.editCustData.isActive
    )
      .then(function (res) {
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetCustomerGridData();
          notification.success({
            message: "Success",
            description: "Customer Updated Successfully.",
            duration: 3,
          });
          self.setState({ EditCustomerMdl: false });
        } else {
          notification.error({
            message: "Error",
            description: "Customer Not Updated",
            duration: 3,
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  /// Delete customer
  handleDeleteCustomer(customer_Id) {
    var self = this;
    this.Cust.DeleteCustomerData(customer_Id)
      .then(function (res) {
        let status = res.data.status;
        let msg = res.data.message;
        if (status) {
          self.handleGetCustomerGridData();
          notification.success({
            message: "Success",
            description: msg,
            duration: 3,
          });
        } else {
          notification.error({
            message: "Error",
            description: msg,
            duration: 3,
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  ///-------------------API function end------------------------

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
  /// Get data for customer edit
  handleGetDataforCustomerEdit(EditData) {
    var editCustData = {};
    editCustData.customerName = EditData.customerName;
    editCustData.customerEmailId = EditData.customerEmailId;
    editCustData.customerPhoneNumber = EditData.customerPhoneNumber;
    editCustData.customerAddress = EditData.customerAddress;
    editCustData.gender = EditData.gender;
    editCustData.isActive = EditData.isActive;

    this.setState({
      EditCustomerMdl: true,
      editCustData,
      customer_ID: EditData.customerID,
    });
  }
  /// handle Edit Input change
  handleEditInputData = (e) => {
    const { name, value } = e.target;
    let editCustData = this.state.editCustData;
    var reg = /^[0-9\b]+$/;
    if (name === "customerPhoneNumber") {
      if (e.target.value === "" || reg.test(e.target.value)) {
        editCustData[name] = value;
        this.setState({
          editCustData,
        });
      } else {
        e.target.value = "";
      }
    } else {
      editCustData[name] = value;
      this.setState({
        editCustData,
      });
    }
  };
  render() {
    return (
      <>
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
                    rowKey="customerID"
                    columns={[
                      {
                        title: "Customer Name",
                        dataIndex: "customerName",
                        columnWidth: 150,
                        sortDirections: ["descend", "ascend"],
                        sorter: (a, b) =>
                          a.customerName.localeCompare(b.customerName),
                      },
                      {
                        title: "Contact No",
                        dataIndex: "customerPhoneNumber",
                        columnWidth: 120,
                        sorter: (a, b) =>
                          a.customerPhoneNumber - b.customerPhoneNumber,
                      },
                      {
                        title: "Email ID",
                        dataIndex: "customerEmailId",
                      },
                      {
                        title: "Status",
                        dataIndex: "isActive",
                        sortDirections: ["descend", "ascend"],
                        sorter: (a, b) => a.isActive - b.isActive,
                        render: (row, item) => {
                          var status = "";
                          if (item.isActive) {
                            status = "Active";
                          } else {
                            status = "InActive";
                          }
                          return <>{status}</>;
                        },
                      },
                      {
                        title: "Action",
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
                                  onClick={this.handleGetDataforCustomerEdit.bind(
                                    this,
                                    item
                                  )}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  onClick={this.handleDeleteCustomer.bind(
                                    this,
                                    item.customerID
                                  )}
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          );
                        },
                      },
                    ]}
                    pagination={{ position: [this.state.paginationBottom] }}
                  />
                </div>
              </Card>
            </div>
          </Row>
          <Modal
            onClose={this.handleEditCustomerMdlClose}
            open={this.state.EditCustomerMdl}
            modalId="editCustomerDetails"
          >
            <div className="p-15">
              <h3 className="text-muted">EDIT CUSTOMER</h3>
              <div>
                <div>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">Full Name</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="Full Name"
                          type="text"
                          name="customerName"
                          maxLength={100}
                          value={this.state.editCustData.customerName}
                          onChange={this.handleEditInputData}
                          autoComplete="off"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">Email ID</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="Email ID"
                          type="email"
                          name="customerEmailId"
                          maxLength={100}
                          value={this.state.editCustData.customerEmailId}
                          onChange={this.handleEditInputData}
                          disabled
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
                          maxLength={10}
                          name="customerPhoneNumber"
                          value={this.state.editCustData.customerPhoneNumber}
                          onChange={this.handleEditInputData}
                          autoComplete="off"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label">Gender</label>
                        <div className="m-t-10">
                          <Radio.Group
                            onChange={this.genderSelect}
                            value={
                              this.state.editCustData.gender === "Male" ? 1 : 2
                            }
                            disabled
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
                        <label className="form-control-label">Address</label>
                        <Input
                          className="form-control-alternative"
                          type="text"
                          placeholder="Address"
                          name="customerAddress"
                          maxLength={100}
                          value={this.state.editCustData.customerAddress}
                          onChange={this.handleEditInputData}
                          autoComplete="off"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label className="form-control-label">Status</label>
                        <select
                          className="form-control drop-down"
                          name="isActive"
                          value={this.state.editCustData.isActive}
                          onChange={this.handleEditInputData}
                        >
                          <option value={true}>Active</option>
                          <option value={false}>InActive</option>
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div>
                  <FormGroup className="txt-center">
                    <Button
                      color="primary"
                      className="btnWidth"
                      onClick={this.handleUpdateCustomer.bind(this)}
                    >
                      Submit
                    </Button>
                  </FormGroup>
                </div>
              </div>
            </div>
          </Modal>
        </Container>
      </>
    );
  }
}

export default CustomerList;
