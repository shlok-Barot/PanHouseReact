import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "./../../helpers/authHeader";

export default class CreditDebitService {
  /// Get customer name
  GetCustomerName(custName) {
    return axios({
      method: "post",
      url: config.apiUrl + "/Customer/GetCustomerName",
      headers: authHeader(),
      params: {
        searchText: custName,
      },
    }).then((res) => {
      return res;
    });
  }

  /// handle add new credit details
  AddCreditDetails(customer_Id, credit_Amount, credit_decsription) {
    return axios({
      method: "post",
      url: config.apiUrl + "/CreditDebit/AddCreditDetails",
      headers: authHeader(),
      data: {
        CustomerID: customer_Id,
        CreditAmount: credit_Amount,
        Description: credit_decsription,
      },
    }).then((res) => {
      return res;
    });
  }

    /// handle add new Debit details
    AddDebitDetails(customer_Id, debit_Amount, debit_decsription) {
      return axios({
        method: "post",
        url: config.apiUrl + "/CreditDebit/AddDebitDetails",
        headers: authHeader(),
        data: {
          CustomerID: customer_Id,
          DebitAmount: debit_Amount,
          Description: debit_decsription,
        },
      }).then((res) => {
        return res;
      });
    }

    /// handle get credit debit grid data
    GetCreditDebitGriddata(){
      return axios({
        method: "post",
        url: config.apiUrl + "/CreditDebit/GetCreditDebitList",
        headers: authHeader(),
      }).then((res) => {
        return res;
      });
    }

    /// share customer report
    ShareCustomerReport(customer_Id){
      return axios({
        method: "post",
        url: config.apiUrl + "/CreditDebit/CustomerShareMassanger",
        headers: authHeader(),
        params: {
          CustomerId: customer_Id,
        },
      }).then((res) => {
        return res;
      });
    }

}
