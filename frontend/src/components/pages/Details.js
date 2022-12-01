import React, { Component } from "react";
import Header from "../layout/Header";
import "../styles/Details.css";
import axios from "axios";
import Restuarants from "../layout/Restuarants";
const queryString = require('query-string');



export default class Details extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: [], 
        resID: undefined,
        galleryModalIsOpen: false,
        menuItemsModalIsOpen: false,
        menuItems: [],
        subTotal: 0,
        formModalIsOpen: false
    }

  }

componentDidMount() {
    const qs = queryString.parse(window.location.search);
    const { restaurant } = qs;
    console.log(restaurant);

    axios({
      
        url: `http://localhost:4000/restuarant/${restaurant}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => {
            this.setState({ restaurants: res.data.Resturants , resID: restaurant})
        })
        .catch(err => console.log(err))
}
handleModal = (state, value) => {
  const { resID } = this.state;
  if (state == "menuItemsModalIsOpen" && value == true){
      axios({
          url: `http://localhost:4000/menuitems/${resID}`,
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
      })
          .then(res => {
              this.setState({ menuItems: res.data.items })
          })
          .catch(err => console.log(err))
  }
  this.setState({ [state]: value });
}
addItems = (index, operationType) => {
let total = 0;
const items = [... this.state.menuItems];
const item = items[index];

if (operationType == 'add'){
    item.qty += 1;
}else{
    item.qty -= 1;
}

items[index] = item;

items.map((item) => {
    total += item.qty * item.price;
})
this.setState({ menuItems: items, subTotal: total })
}
initPayment = (data) => {
  const options = {
    key: "rzp_test_DNJ7NlX6C4iMIH",
    amount: data.amount,
    currency: data.currency,
    description: "Test Transaction",
    order_id: data.id,
    handler: async (response) => {
      try {
        const verifyUrl = "http://localhost:4000/api/payment/verify";
        const { data } = await axios.post(verifyUrl, response);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    theme: {
      color: "#3399cc",
    },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
}

  handlePayment = async () => {
  const { subTotal } = this.state;

      try {
    const orderUrl = "http://localhost:4000/api/payment/orders";
    const { data } = await axios.post(orderUrl, { amount: subTotal });
    console.log(data);
    this.initPayment(data.data);
  } catch (error) {
    console.log(error);
  }
}


  render() {
    const {restaurants,galleryModalIsOpen,menuItemsModalIsOpen,menuItems,formModalIsOpen,subTotal}=this.state
    console.log(restaurants);

    return (
      <>
        <div>
       <Restuarants restaurant={restaurants} addItems={this.addItems} handleModal={this.handleModal}
        galleryModalIsOpen={galleryModalIsOpen} menuItemsModalIsOpen={menuItemsModalIsOpen} 
        menuItems={menuItems} formModalIsOpen={formModalIsOpen} subTotal={subTotal} handlePayment={this.handlePayment}
        />
      </div>
      </>
    )
  }
}
