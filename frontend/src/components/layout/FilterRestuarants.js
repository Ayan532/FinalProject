import React, { Component } from 'react'

export default class FilterRestuarants extends Component {
 

  render() {
    const {item,handleNavigate}=this.props
    return (
      <div>    
      <div className=" container card w-100" style={{cursor:'pointer'}} onClick={() => handleNavigate(item._id)}>
      <div className="cardItems p-md-2 p-3">
      <div className="cardHeader  d-flex justify-content-center align-items-center gap-4 p-sm-3">
          <img className="img-fluid" src={`./Img/${item.image}.png`} alt=""/>
          <div className="cardHeaderContent container d-flex flex-column ">
              <span className="Name">{item.name} </span>
              <span className="Option">{item.city}</span>
              <p className="address">{item.locality}</p>
            </div>
          </div>
          <hr className="hr"/>
      <div className="cardBody  d-flex gap-3">
        <div className="cardBodySide d-flex flex-column   p-lg-4">
          <span>CUISINES:</span>
          <span>COST FOR TWO:</span>
        </div>
        <div className="cardBodyRight d-flex flex-column   p-lg-4">
           <span>{item.cuisine.map((data) => `${data.name}, ` )} </span>
           <span>₹{item.min_price}</span>
      </div>
      </div>
    </div>
  </div></div>
    )
  }
}
