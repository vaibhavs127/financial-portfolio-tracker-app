import React from "react";
import "./components/StockTable/Mystock";
import "./App.css";
import Header from "./components/Header/Header";
import Mystock from "./components/StockTable/Mystock";
import Hrline from "./components/Hrline/Hrline";
import Conatiner from "./components/Container/Container";

function App(_props) {
  return (
    <div className="App">
        <Header />
      <div className="container">
        <Mystock />
      </div>
        <Hrline />
      <div className="addstock">
        <Conatiner />
      </div>
    </div>
  );
}

export default App;
