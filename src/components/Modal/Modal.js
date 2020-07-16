import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import Backdrop from "../Backdrop/Backdrop";
import firebase from '../../Firebase/firebase';
import "../Modal/Modal.css";





  

let data;

class Modal extends Component {
    
constructor(props){
    super(props)
    this.state = {
        number_of_shares:'',
        Buy_price:'',
        Buy_date:'',
        csymbol:'',
        cname:'',
        shareErr:"",
        PriceErr:"",
        iagain:true

        
    }
    this.postData = this.postData.bind(this);    
}

postData = (number_of_shares,Buy_price) =>{ 
   
    
    
        
    let newData =  data.push();
    newData.set({
        number_of_shares:this.state.number_of_shares,
         Buy_price:this.state.Buy_price,
         Buy_date:this.state.Buy_date,
         csymbol:this.props.symb,
         cname:this.props.name
    })


}

   handleChangeN = (event)=>{
       event.preventDefault();
       this.setState({
           number_of_shares:event.target.value
       })
   }

   handleChangeP = (event)=>{
    event.preventDefault();
    this.setState({
        Buy_price:event.target.value
    })
}

handleChangeD = (event)=>{
    event.preventDefault();
    this.setState({
        Buy_date:event.target.value
    })
}

handleChange = (props) =>{
this.setState({
    symbol:this.props.compname
})
}


    render(){
         if(!this.props.show) {
             return null;
           }

           data = firebase.database().ref('/MyStocks');
          return (
           
        <div>
            
            <div className="AddStockForm">
            
                {this.props.children} 
                <Backdrop/>
              <div style={{height: '300px', textAlign: 'center', position: 'fixed', backgroundColor: '#fff', zIndex: 500, left: '15%', top: '10%', boxSizing: 'border-box', width: '70%'}}>
                <h1 className="adds">Add the {this.props.name} to my stocks</h1><br></br><br></br>
                <form className="sform" onSubmit={this.onsubmit}>
                
            <label className="company-name">Company Name:</label>    <b className="nameOf">{this.props.name}</b><br></br> 
            
                         
            <br></br>
            <label>No. of Shares:</label>
    
            <input id="noShares" type="number" value={this.state.number_of_shares} onChange={this.handleChangeN}/><br></br>
            <p id="serror">{this.state.shareErr}</p>
            
            <label>Buy Price:</label>
               
             <input id="buyPrice" type="number" value={this.state.Buy_price} onChange={this.handleChangeP}/><br></br>
             <p>{this.state.PriceErr}</p>
                <label>Buy Date:</label>
                <input id="buyDate" type="date"  value={this.state.Buy_date} onChange={this.handleChangeD}/><br></br>
                <br></br>
                <button className="btnclose" onClick={this.props.onClose}>
                Close
                </button>
                <span>
                <button className="AddButton" onChange={this.handleChange.bind(this)} onClick={this.postData}>Add</button>
                </span>

                </form>


                </div>
                
            </div>
            
        </div>
        )
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
  }
export default Modal;