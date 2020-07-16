import React, { Component } from "react";
import "./Mystock.css";
import "../AddStock/AddStock";
import axios from "axios";
import firebase from "firebase";

class Mystock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      details: [],
      message: false,
    };
  }

  componentDidMount() {
    axios
      .get(`https://fin-portfolio-acc46.firebaseio.com/MyStocks.json`)
      .then((db) => {
        const res = db.data;
        if (res === null) {
          this.setState({
            message: true,
          });
        } else {
          console.log(res);
          let Keys = [];
          let Upres = Object.values(res);

          console.log("The V:" + Upres);
          Keys = Object.keys(res);
          console.log("Keys:" + Keys);
          for (let i = 0; i < Keys.length; i++) {
            let noshares = Upres[i].number_of_shares;
            console.log("All share:--" + noshares);
            let buyprice = Upres[i].Buy_price;
            console.log("Buy price" + buyprice);
            
            let c_symb = Upres[i].csymbol;

            this.StockInfo = (x) => {
              axios
                .get(
                  `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${c_symb}&apikey=EKX92O33V228XF07`
                )
                .then((res) => {
                  let Data = [];
                  let Current_p = [];

                  Data = res.data;
                  console.log(Data);

                  Current_p = Data["Time Series (Daily)"][x]["4. close"];
                  console.log("date of :" + Current_p);

                  Upres[i]["currentPrice"] = Current_p;
                  Upres[i]["profit_loss"] = Math.trunc(
                    (Upres[i]["currentPrice"] - Upres[i].Buy_price) *
                      Upres[i].number_of_shares
                  );


                  this.setState({
                    details: Upres,
                  });
                })

                .catch((error) => {
                  console.log(error);
                });
            };

            const date = new Date();

            const day = date.getDay();
            let prevd = date.getDate() - (date.getDay() - 1) - 3;
            prevd = prevd.toString().padStart(2, "0");
            if (day === 0 || day === 6) {
              const formatd = `${date
                .getFullYear()
                .toString()
                .padStart(4, "0")}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${prevd}`;
              this.StockInfo(formatd);
            } else {
              const formatd = `${date
                .getFullYear()
                .toString()
                .padStart(4, "0")}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${prevd}`;
              console.log("the  date" + formatd);
              this.StockInfo(formatd);
            }
          }
        } 
      });
  }

  stopTrack = (index) => {
    let Sym = this.state.details[index]["csymbol"];

    let ref = firebase.database().ref("MyStocks");
    ref
      .orderByChild("csymbol")
      .equalTo(Sym)
      .once("value", (snapshot) => {
        const updates = {};
        snapshot.forEach((child) => {
          updates[child.key] = null;
        });
        ref.update(updates);
        alert("Stock Deleted!please refresh the page...");
      });
  };

  render() {
    let Lmessage = "No stocks";

    let rowArray = this.state.details.map((item, i) => {
      const {
        Buy_price,
        csymbol,
        cname,
        number_of_shares,
        currentPrice,
        profit_loss,
      } = item;
      const btnStyle = {
        background: "#ff0000",
        color: "#fff",
        border: "none",
        padding: "5px 9px",
        borderRadius: "10%",
        cursor: "pointer",
      };
      return (
        <tr key={i}>
          <td>{csymbol}</td>
          <td>{cname}</td>
          <td>{number_of_shares}</td>
          <td>{Buy_price}</td>
          <td>{currentPrice}</td>
          <td>{profit_loss}</td>
          <td>
            <button
              className="StopTrackingBtn"
              onClick={() => this.stopTrack(i)}
              className="StopTrackingBtn"
              style={btnStyle}>
              stop tracking
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="MyStocks">
        <h1 className="mstocks">My Stocks</h1>
        <br></br>
        <br></br>
        <br></br>
        <table className="MyStocksTable">
          <tr>
            <th>Stock Symbol</th>
            <th>Stock name</th>
            <th>No.of shares</th>
            <th>Buy price</th>
            <th>Current price</th>
            <th>Profit/Loss</th>
            <th>Action</th>
          </tr>
          <tbody>{rowArray}</tbody>
        </table>

        <div className="ExcessStock">
          {this.state.message ? <h1>{Lmessage}</h1> : <div></div>}
        </div>
      </div>
    );
  }
}

export default Mystock;
