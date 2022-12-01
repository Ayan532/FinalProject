import React, { Component } from "react";
import Modal from 'react-modal';
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import MenuItemsCard from "./MenuItemsCard";

const customStyles = {
  content: {
    top: '60%',
    left: '50%',
    right: '50%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#191919',
    width:"100%",
    height:"100vh",
   

  }
}
const customStyles_2 = {
  content: {
    top: '54%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },

};
export default class Restuarants extends Component {
  constructor() {
    super();
    this.state={
      name:undefined,
      email:undefined,
      address:undefined,
    }
   
}
handleChange=(e)=>{
  const {name,email,address}=e.target.value
  console.log(name,email,address);
}
  
 
  render() {
    const {restaurant, galleryModalIsOpen, menuItemsModalIsOpen, menuItems, subTotal, formModalIsOpen,addItems,handleModal,handlePayment } = this.props;
    const {name,email,address}=this.state;
    return (
      <div>
        <div className="container position-relative mt-4   d-flex justify-content-center align-items-center resImg ">
          <img
            className=""
            src={`/Img/${restaurant.image}@2x.png`}
            width="1000px"
            height="352px"
            style={{ objectFit: "cover" }}
            alt="daa"
          />

          <div className="img-text-container" style={{cursor:'pointer'}}  onClick={() => handleModal('galleryModalIsOpen', true)}>
            <p className="img-text position-absolute">
              Click to see Image Gallery
            </p>
          </div>
        </div>
        <div className="" style={{paddingRight:"2rem"}}>

        <div
          className=" container mt-4  header  d-flex justify-content-between "
          style={{ width: "80%" }}
        >
          <h3>{restaurant.name}</h3>
          
        </div>
        <button className=" btn btn-danger float-end mx-5 " onClick={() => handleModal('menuItemsModalIsOpen', true)}>
            Place Online Order
          </button>
        <div
          className="container mt-5  res_tab_container"
          style={ galleryModalIsOpen || menuItemsModalIsOpen || formModalIsOpen  ?{ zIndex:-1}:{}}
        >
        <div>
          <div className="tab">
            <input type="radio" id="tab-1" name="tab-group-1" checked />
            <label for="tab-1">Overview</label>

            <div className="content df">
              <div className="about py-3">About the place</div>
              <div className="head py-3">Cuisine</div>
              <div className="value">
                {restaurant &&
                  restaurant.cuisine &&
                  restaurant.cuisine.map((cuisine) => `${cuisine.name}, `)}
              </div>
              <div className="head py-3">Average Cost</div>
              <div className="value">
                &#8377; {restaurant.min_price} for two people(approx)
              </div>
            </div>
          </div>
          {/* Tab-2 */}
          <div className="tab">
            <input type="radio" id="tab-2" name="tab-group-1" />
            <label for="tab-2">Contact</label>
            <div className="content">
              <div className="head py-3">Phone Number</div>
              <div className="value_red">+{restaurant.contact_number}</div>
              <div className="head py-3">{restaurant.name}</div>
              <div className="value">{`${restaurant.locality}, ${restaurant.city}`}</div>
            </div>
          </div>
        </div>
          </div>
         
        </div>
      
        <Modal 
           
                isOpen={galleryModalIsOpen}
                    style={customStyles} >
                    <div style={{backgroundColor:"gray",width:"30px",height:"30px",borderRadius:"50%",float: 'right',display:'flex',justifyContent:"center",alignItems:"center"}}>
                    <i class="fa-solid fa-xmark" style={{}}  onClick={() => handleModal('galleryModalIsOpen', false)}></i>

                    </div>
                    <Carousel showThumbs={false} showStatus={false}>
                        { restaurant?.thumb?.map((item) => {
                            return (
                                <div>
                                    <img src={`./Img/${item}`} style={{width:"891px",height:"400px",borderRadius:"10px",marginTop:"20px"}} />
                                </div>
                            )  
                
                        })}
                        
                    </Carousel>       
                        
                </Modal>
                <Modal
                    isOpen={menuItemsModalIsOpen}
                    style={customStyles_2} >
                     <i class="fa-solid fa-xmark" style={{float:'right'}} onClick={() => handleModal('menuItemsModalIsOpen', false)}></i>
                     <div className="container-fluid">
                      <h2 className="resturant_name">The Big Chill Cakery</h2>
                      <div style={{overflowX:"hidden",overflowY:"scroll",maxHeight:"60vh"}}>

                      
                        {
                          menuItems.map((item, index) => 
                              (<MenuItemsCard item={item} index={index} key={item._id} addItems={addItems}/>)  
                          )
                        }
                    
                        
                      </div>

                      
                      </div>
                      <div className="sub_total_cont w-100 h-100">
                        <h3 className="sub_total" >SubTotal</h3>
                        <h4 className="sub_total_price">{subTotal}</h4>
                        <div className="sub_total_btn_cont"><button className="sub_total_btn" onClick={ () => {
                                handleModal('menuItemsModalIsOpen', false);
                                handleModal('formModalIsOpen', true) }}> Pay Now </button></div>
                      </div>
                     
                    </Modal>
                    <Modal
                    isOpen={formModalIsOpen}
                    style={customStyles_2}
                >
                    <div>
                    <i class="fa-solid fa-xmark" style={{float:'right'}}  onClick={() => handleModal('formModalIsOpen', false)}></i>
                        <h2 className="user_details_restaurant_name">{restaurant.name}</h2>
                        {/* <form > */}

                        <div>
                            <label className="user_details_name">Name</label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="text" placeholder="Enter your Name" value={name} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className="user_details_name">Email : </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="text" placeholder="Enter your Email" value={email} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className="user_details_name">Contact Number : </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="tel" placeholder="Enter your Contact Details"/>
                        </div>
                        <div>
                            <label className="user_details_name">Address: </label>
                            <textarea className="form-control"  rows="6" 
                                type="text" placeholder="Enter your Address" value={address} onChange={this.handleChange} />
                        </div>
                        <div className="sub_total_btn_2">
                        <button className="sub_total_btn" onClick={handlePayment}>Proceed</button>
                        </div>
                        {/* </form> */}
                    </div>
                </Modal>


      </div>
    );
  }
}
