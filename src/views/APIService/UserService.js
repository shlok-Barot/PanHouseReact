import axios from "axios";
import { authHeader } from "./../../helpers/authHeader";
import config from "./../../helpers/config";

export default class UserService {
  /// Get User Profile data
  GetUserProfileData() {
    return axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserProfileDetail",
      headers: authHeader(),
    }).then((res) => {
      return res;
    });
  }

  /// Update User profile data
  UpdateUserProfileData(formData) {
    return axios({
      method: "post",
      url: config.apiUrl + "/User/UpdateUserProfileDetails",
      headers: authHeader(),
      data: formData,
    }).then((res) => {
      return res;
    });
  }
}
