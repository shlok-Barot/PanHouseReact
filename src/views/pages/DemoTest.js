import React from "react";
import { connect } from "react-redux";

function DemoTest(props) {
  return (
    <div>
      <h2>Test User Page</h2>
      <h3>Hello My name is {props.myname}</h3>
      <button
        onClick={() => {
          props.changeName("SHLOK BAROT");
        }}
      >
        Change name
      </button>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    myname: state.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeName: (name) => {
      dispatch({ type: "CHANGE_NAME", payload: name });
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(DemoTest);
