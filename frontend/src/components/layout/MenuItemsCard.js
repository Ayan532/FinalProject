import React, { Component } from 'react'

export default class MenuItemsCard extends Component {
  render() {
    const {item,index,addItems}=this.props
    return (
      <div>
      <div className="items_cart">
      <div className="items_description">
          <div>
            <h5 className="menu_item_name">{item.name}</h5>
          </div>
          <div>
            <h5 className="menu_item_price">{item.price}</h5>
          </div>
          <div>
             <p className="text-wrap menu_item_desc">{item.description}</p>
          </div>
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center position-relative'>
          <img  src={`/Img/${item.image}`} alt=""  width="80px" height="80px"  style={{borderRadius:"10px",zIndex:-1}}/>
             
             {
                          item.qty==0?(
                            <div >
                          <button className="add_btn"   onClick={() => addItems (index, 'add')}>Add</button>
                        </div>):(
                          <div>
                          <div className='add_num d-flex justify-content-evenly'>
                            <button  style={{all:'unset',cursor:'pointer'}} className="sub_btn" onClick={() => addItems (index, 'subtraction')}>-</button>
                            <span className='qty_cont'>
                              <span className='qty'>{item.qty}</span>
                            </span>
                            <button style={{all:'unset',cursor:'pointer'}} onClick={() => addItems (index, 'add')}>+</button>
                          </div>
                          </div>
                        )
                        } 
                        
                      </div>
          
          
          
      </div>
          <hr />
      </div>
    )
  }
}
