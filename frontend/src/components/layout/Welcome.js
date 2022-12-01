import React, { Component } from 'react'
import Modal from 'react-modal';
import Header from './Header';
import axios from 'axios';
import withNavigateHook from './HOC';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width:"30%",
        height:"50vh"
    },
};
class Welcome extends Component {
  constructor() {
    super();
     this.state={
      restaurants: [],
      inputText: undefined,
      suggestions: []
     }

   }
  handleLocationChange = (event) => {
    const locationId = event.target.value;
    sessionStorage.setItem('locationId', locationId);
    axios({
      url: `http://localhost:4000/restaurants/${locationId}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  })
      .then(res => {
          this.setState({ restaurant: res.data.restaurants })
      })
      .catch(err => console.log(err))
}
handleInputChange = (event) => {
  const { restaurant } = this.state;
  const inputText = event.target.value;

  let suggestions = [];

  suggestions = restaurant.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
  this.setState({ inputText, suggestions });
}

selectingRestaurant = (resObj) => {
  this.props.navigation(`/details?restaurant=${resObj}`);
}

showSuggestion = () => {
  const { suggestions, inputText } = this.state;

      if (suggestions.length == 0 && inputText == undefined) {
          return null;
      }
      
      if (suggestions.length > 0 && inputText == '') {
          return null;
      }
      
      if (suggestions.length == 0 && inputText) {
          return (
              <li className='notfoundHome'>No Search Results Found</li>)
      }

      return (
        suggestions.map((item, index) => (<li key={index} onClick={() => this.selectingRestaurant(item._id)} >
            <img className="resImg_1" src={`./Img/${item.image}.png`} />
            <span className="resName">{`${item.name}`}</span> <br /> 
            <span className="resLoc">{`${item.locality}, ${item.city}`} </span> <hr className="line" /> </li>))
          );
    }

  render() {
    const { locations,loginModalIsOpen,handleModal,google,user,handleLogout,github} = this.props
    return (
      <div> <div className="container-fluid banners">
       {/* <nav className=" d-none d-lg-block  navbar navbar-expand-lg">
          {user?(<div className="container d-flex justify-content-end align-items-center gap-5">
              <button className="btn text-white">{user.displayName || user.username}</button>
              <button className="btn text-white" onClick={handleLogout}>Logout</button>
          </div>):(<div className="container d-flex justify-content-end align-items-center gap-5">
              <button className="btn text-white"   onClick={() => handleModal('loginModalIsOpen', true)}>Login</button>
              <button className="btn text-white">Create a Account</button>
          </div>)}
      </nav> */}
      
      <div className="container d-flex flex-column justify-content-center align-items-center gap-4">
          <div className="logos mt-lg-3 mt-5">
              <b>e!</b>
            </div>
          <div className="headerTexts text-white text-wrap  text-center">Find the best restaurants, cafés, and bars</div>
          <div className="headerActions d-md-flex gap-3 justify-content-center align-items-center">
              <div>
                  <select id="selects" className="py-3 px-2"  onChange={this.handleLocationChange}>
                      <option default value={0} disabled selected>Please Type a Location</option>
                       { locations?.map((item)=>{
                         return(
                          <option key={item.locationId} value={item.locationId} >
                                        {`${item.location}`}
                                    </option>
                         )
                       })

                       }
                    </select>
              </div>
              <div className="searchs d-flex justify-content-center align-items-center py-3 px-2 bg-white d-flex gap-2">

                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                  id="Searchs"
                  type="search"
                  className="border-0 w-100"
                  placeholder="Search for restaurants"
                  onChange={this.handleInputChange} 
                />
                  
             
              </div>
          </div>

      </div>
      <div className='container d-flex float-end justify-content-center suggestion_Cont'>

                  <ul className="suggestion" >{this.showSuggestion()}</ul>
      </div>
  </div>
  {/* <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles} >
                    <div>   
                    <i class="fa-solid fa-xmark" style={{float:'right'}}  onClick={() => handleModal('loginModalIsOpen', false)}></i>
                    <div class="loginCont">
                     <h2 className='login'>Login</h2>
                    <div className="loginButton google" onClick={google} style={{cursor:'pointer'}}>
                        <img src="./Img/google1.png" width={40} height={40}  alt="" className="icon" />
                        <span className='google_span'>
                        Continue with Google

                        </span> 
                    </div>
                    
                    <div className="loginButton github" onClick={github} style={{cursor:'pointer'}}>
                        <img src="./Img/github1.png" width={40} height={40} alt="" className="icon" />
                        <span className='github_span'>
                         Continue with Github

                        </span> 
                    </div>    
                    </div>
                        
                    </div>    
                </Modal> */}</div>
    )
  }
}
export default withNavigateHook(Welcome)