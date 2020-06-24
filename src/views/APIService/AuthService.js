import axios from "axios";
import config from "./../../helpers/config";
import { encryption } from "helpers/encryption";

export default class AuthService {
  /// Login API
  AuthLogin(emailId, password) {
    var X_Authorized_userId = encryption(emailId, "enc");

    let X_Authorized_password = encryption(password, "enc");
    let X_Authorized_Domainname = encryption(window.location.origin, "enc");
   return axios({
      method: "post",
      url: config.apiUrl + "/Account/authenticateUser",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Authorized-userId": X_Authorized_userId,
        "X-Authorized-password": X_Authorized_password,
        "X-Authorized-Domainname": X_Authorized_Domainname,
      },
    }).then((res)=>{
      debugger
      return res;
    });
  }
}
