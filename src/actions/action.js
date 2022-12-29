import axios from "axios";
import config from "helpers/config";
import { authHeader } from "helpers/authHeader";

export const GetUserList = () => {
  return async (dispatch) => {
    return axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserProfileDetail",
      headers: authHeader(),
    })
      .then((resp2) => {
        dispatch({ type: "Get_User", playload: resp2 });
      })
      .catch((resp2) => {
        console.log(resp2);
      });
  };
};
