import axios from "axios";
import { authHeader } from "./../../helpers/authHeader";
import config from "./../../helpers/config";

export default class CustService {
  ///Get Customer Grid Data
  GetCustomerData(filterCustName) {
    debugger;
    return axios({
      method: "post",
      url: config.apiUrl + "/Customer/GetCustomerList",
      headers: authHeader(),
      params: {
        CustomerName: filterCustName === "" ? null : filterCustName,
      },
    }).then((res) => {
      return res;
    });
  }

  /// Add new customer
  AddCustomerDetails(
    customerFullName,
    EmailId,
    mobileNo,
    genderID,
    custAddress
  ) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Customer/CreateCustomer",
      headers: authHeader(),
      data: {
        CustomerName: customerFullName,
        CustomerPhoneNumber: mobileNo,
        CustomerEmailId: EmailId,
        Gender: genderID === 1 ? "Male" : "Female",
        CustomerAddress: custAddress,
      },
    }).then((res) => {
      return res;
    });
  }

  /// Update customer
  UpdateCustomerDetils(
    customer_ID,
    customerName,
    EmailId,
    PhoneNo,
    Address,
    genderId,
    isActive
  ) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Customer/UpdateCustomer",
      headers: authHeader(),
      data: {
        CustomerID: customer_ID,
        CustomerName: customerName,
        CustomerPhoneNumber: PhoneNo,
        CustomerEmailId: EmailId,
        Gender: genderId,
        CustomerAddress: Address,
        IsActive: isActive,
      },
    }).then((res) => {
      return res;
    });
  }

  /// Delete customer
  DeleteCustomerData(customer_Id) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Customer/DeleteCustomer",
      headers: authHeader(),
      params: {
        CustomerID: customer_Id,
      },
    }).then((res) => {
      return res;
    });
  }
}
