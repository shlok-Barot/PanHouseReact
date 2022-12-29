import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import UserService from "views/APIService/UserService";
import ProfileImg from "./../../assets/img/theme/Avatar1.jpg";
import ImgUpload from "./../../assets/img/icons/common/fileIcon.jpg";
import { notification, Spin } from "antd";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      emailId: "",
      mobileNo: "",
      address: "",
      userProfile: "",
      companyName: "",
      cityName: "",
      userId: 0,
      fileName: [],
      imgFlag: "",
      addressValidation: "",
      mobileNoValidation: "",
      loading: false,
    };
    this.User = new UserService();
  }

  componentDidMount() {
    this.handleGetUserProfileData();
  }

  /// ----------------API Start functiopn-------------------------
  handleGetUserProfileData() {
    var self = this;
    this.setState({
      loading: true,
    });
    this.User.GetUserProfileData()
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            loading: false,
          });
          self.handleSetUserData(data[0]);
        } else {
          self.setState({
            loading: false,
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }

  handleUpdateUserProfileData() {
    var self = this;
    if (this.state.address !== "" && this.state.mobileNo !== "") {
      var user_data = {
        UserId: this.state.userId,
        FirstName: this.state.firstName,
        LastName: this.state.lastName,
        MobileNo: this.state.mobileNo,
        EmailId: this.state.emailId,
        Address: this.state.address,
        CompanyName: this.state.companyName,
      };
      const formData = new FormData();

      formData.append("UserProfileDetailsModel", JSON.stringify(user_data));
      formData.append("file", this.state.fileName[0]);

      this.User.UpdateUserProfileData(formData)
        .then(function (res) {
          let status = res.data.message;
          if (status === "Success") {
            self.setState({
              addressValidation: "",
              mobileNoValidation: "",
            });
            notification.success({
              message: "Success",
              description: "Data Updated Successfully.",
              duration: 3,
            });
            setTimeout(function () {
              self.props.history.push("/admin/dashboard");
            }, 500);
          } else {
            notification.error({
              message: "Error",
              description: "Data Not Updated",
              duration: 3,
            });
          }
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      this.setState({
        mobileNoValidation: "Please enter mobile number.",
        addressValidation: "Please enter address.",
      });
    }
  }
  /// ----------------API end functiopn---------------------------
  /// handle set data
  handleSetUserData(data) {
    var image = data.profilePicture.split("/");
    var imgFlag = image[image.length - 1];

    this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      address: data.address,
      mobileNo: data.mobileNo,
      companyName: data.companyName,
      cityName: data.cityName,
      userId: data.userId,
      userProfile: data.profilePicture,
      imgFlag,
    });
  }
  /// handle input onchange
  handleInputOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /// handle file upload
  handlefileUpload(e) {
    var allFiles = [];
    var selectedFiles = e.target.files;
    allFiles.push(selectedFiles[0]);
    this.setState({
      fileName: allFiles,
    });
  }
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "300px",
            backgroundImage:
              "url(" + require("assets/img/theme/ProfileCover1.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          <span className="mask bg-gradient-default opacity-8" />
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="12" md="12">
                <h1 className="display-2 text-white">
                  Hello {this.state.firstName}
                </h1>
              </Col>
            </Row>
          </Container>
        </div>
        <Spin size="large" spinning={this.state.loading}>
          <Container className="mt--7" fluid>
            <Row>
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={
                              this.state.imgFlag === ""
                                ? ProfileImg
                                : this.state.userProfile
                            }
                          />
                        </a>
                      </div>
                    </Col>
                  </Row>

                  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <div className="d-flex justify-content-between">
                      <Button
                        className="mr-4"
                        color="info"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Connect
                      </Button>
                      <Button
                        className="float-right"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Message
                      </Button>
                    </div>
                  </CardHeader>
                  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 mobilespace">
                    <div className="d-flex justify-content-between">
                      <label
                        htmlFor="Userfile-upload"
                        className="circleImgupload"
                      >
                        <img
                          alt="User Profile"
                          className="rounded-circle imgWidth"
                          src={ImgUpload}
                        />
                      </label>
                    </div>
                    <Input
                      type="file"
                      name="file"
                      id="Userfile-upload"
                      style={{ display: "none" }}
                      onChange={this.handlefileUpload.bind(this)}
                    />
                  </CardHeader>
                  <CardBody className="pt-0 pt-md-4">
                    <div className="text-center">
                      <h2>
                        {this.state.firstName}&nbsp;
                        {this.state.lastName}
                      </h2>
                      <div className="h5 font-weight-300">
                        <i className="ni ni-pin-3 mr-2" />
                        {this.state.cityName}
                      </div>
                      <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                        <i className="ni ni-shop mr-2" />{" "}
                        {this.state.companyName}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="12 txt-center">
                        <h3 className="mb-0">My account</h3>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label className="form-control-label">
                              First Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Enter First Name"
                              type="text"
                              autoComplete="off"
                              maxLength={50}
                              name="firstName"
                              value={this.state.firstName}
                              onChange={this.handleInputOnchange}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label className="form-control-label">
                              Last Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Enter Last Name"
                              type="text"
                              autoComplete="off"
                              maxLength={50}
                              name="lastName"
                              value={this.state.lastName}
                              onChange={this.handleInputOnchange}
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
                              placeholder="Enter Mobile Number"
                              autoComplete="off"
                              type="email"
                              maxLength={10}
                              name="mobileNo"
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
                            <label className="form-control-label">
                              Email ID
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Enter Email ID"
                              type="email"
                              maxLength={100}
                              name="emailId"
                              value={this.state.emailId}
                              onChange={this.handleInputOnchange}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label className="form-control-label">
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="Enter Address"
                              autoComplete="off"
                              type="text"
                              maxLength={100}
                              name="address"
                              value={this.state.address}
                              onChange={this.handleInputOnchange}
                            />
                            {this.state.address.length === 0 && (
                              <p className="validationMsg">
                                {this.state.addressValidation}
                              </p>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <div className="pl-lg-4">
                      <FormGroup className="txt-center">
                        <Button
                          color="primary"
                          className="btnSubmit"
                          type="submit"
                          onClick={this.handleUpdateUserProfileData.bind(this)}
                        >
                          Submit
                        </Button>
                      </FormGroup>
                    </div>
                  </CardBody>
                  <div className="usrChangePass">
                    <Link to="/auth/changepassword"> Change Password </Link>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </Spin>
      </>
    );
  }
}

export default Profile;
