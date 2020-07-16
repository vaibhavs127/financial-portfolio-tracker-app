import React, { Component } from "react";
import "./AddStock.css";
import axios from "axios";
import Modal from "../Modal/Modal";

class AddStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      compname: "",
      compsymb: "",
      Stockname: [],
      Stocksymb: "",
      results: [],
      counter: "",
      key: "",
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    axios
      .get(`https://fin-portfolio-acc46.firebaseio.com/tickers.json`)
      .then((db) => {
        let index = Object.values(db);

        this.setState({
          results: db.data,
        });
        console.log(this.state.results);
      });

    let bind = [];
    bind = this.state.results;
  }

  toggleModal = (e, key) => {
    let currentN = this.state.results[key];
    let currentNS = this.state.results[key];
    currentN = currentN.name;
    currentNS = currentNS.symbol;
    console.log("keys:" + key);

    this.setState({
      isOpen: !this.state.isOpen,
      compname: currentN,
      compsymb: currentNS,
      key: key,
    });
  };

  render() {
    let array = this.state.results.map((index, key) => {
      return (
        <div className="tickerMainContainer">
          <div className="tickerContainer">
            <div className="tickerItem" key={key}>
              <div
                className="StockButton"
                onClick={(e) => this.toggleModal(e, key, "key")}>
                {index.symbol}
              </div>
            </div>
            <div className="tickerItemText">{index.name}</div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="AddStocksTitle">
          <b>Add Stocks</b>
        </div>
        <div>
          <ul className="tickerContainer">{array}</ul>
        </div>

        <Modal
          show={this.state.isOpen}
          onClose={this.toggleModal}
          name={this.state.compname}
          symb={this.state.compsymb}
          number={this.state.key}/>
      </div>
    );
  }
}

export default AddStock;
