const iState = {
  name: "Shlok",
  CustData: ["shlok", "barot"],
};

const reducer = (state = iState, action) => {
  if (action.type === "CHANGE_NAME") {
    return {
      ...iState,
      name: action.payload,
    };
  }
  return state;
};

export default reducer;
