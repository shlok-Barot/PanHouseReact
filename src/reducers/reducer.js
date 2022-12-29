const iState = {
  firstName: "",
  lastName: "",
  emailId: "",
  mobileNo: "",
  address: "",
  userProfile: "",
  imgFlag: "",
  companyName: "",
  cityName: "",
  userId: 0,
};

const reducer = (state = iState, action) => {
  if(action.type === "Get_User"){
    var image = action.playload.data.responseData[0].profilePicture.split(
      "/"
    );
    var imgFlag = image[image.length - 1];
    return {
      ...iState,
      firstName: action.playload.data.responseData[0].firstName,
      lastName: action.playload.data.responseData[0].lastName,
      emailId: action.playload.data.responseData[0].emailId,
      mobileNo: action.playload.data.responseData[0].mobileNo,
      companyName: action.playload.data.responseData[0].companyName,
      address: action.playload.data.responseData[0].address,
      cityName: action.playload.data.responseData[0].cityName,
      userId: action.playload.data.responseData[0].userId,
      userProfile: action.playload.data.responseData[0].profilePicture,
      imgFlag,
    };
  }
  return state;
};

export default reducer;
