import React, { Component } from 'react'

export default class NotFound extends Component {
  render() {
    return (
      <div>    
      <div className=" container card w-100 notfoundCont" style={{cursor:'pointer'}}>
      <div className="cardItems p-md-2 p-5">
      <div className="cardHeader  d-flex justify-content-center align-items-center gap-4 p-5 ">
          <span className="notfound text-center p-5">
          Sorry. No result found

          </span> 
          </div>
   
    </div>
  </div></div>
    )
  }
}
