import React from "react";

const Header = () => {
  return (
    <div className="header" style={headerStyle}>
      {" "}
      Financial Portfolio{" "}
    </div>
  );
};

const headerStyle = {
  color: "white",
  backgroundColor: "blue",
  width: "100%",
  textAlign: "center",
  height: "70px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  fontSize: "30px",
  fontWeight: "500",
};

export default Header;
