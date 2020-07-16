import React from "react";
import { Component } from "react";

class Backdrop extends Component {
  render() {
    const Backdrop={
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 100,
          position: "fixed",
          left: 0,
          top: 0,
    }
    return (<div style={Backdrop}></div>);  
  }
}

export default Backdrop;
