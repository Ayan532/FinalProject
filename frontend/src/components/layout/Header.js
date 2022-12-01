import React, { Component } from "react";
import "../styles/Header.css";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
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
export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loginModalIsOpen: false,
      avatarbtn:false

    };
  }

  handleLogout = () => {
    window.open("http://localhost:4000/auth/logout", "_self");
  };

  google = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };
  github = () => {
    window.open("http://localhost:4000/auth/github", "_self");
  };

  handleModal = (state, value) => {
    this.setState({ [state]: value });
  };

  render() {
    const {  handleModal, github,google,handleLogout,loginModalIsOpen,avatarbtn} = this.state;
    const {user}=this.props

    return (
      <>
        <div className="sticky-top">
          <nav className="navbar  navbar-expand-lg navbar-nav bg-red w-100" >
            <div className="container">

              <div className="logo_header">
               <Link to={"/"} style={{textDecoration:"none"}}>

                <b>e!</b>
               </Link>
              </div>
             {user?(<>
             <div>
                 <div class="dropdown">
                <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                 <img src={user.photos[0].value} width={40} height={40} style={{borderRadius:"50%"}} onClick={()=>this.setState({avatarbtn:true})}/>
                </button>
                <ul class="dropdown-menu position-absolute" >
                  <li>
                  <button className="btn dropdown-item">{user.displayName || user.username}</button>
                  </li>
                  <li>
                    <button className="btn  dropdown-item" onClick={this.handleLogout}>Logout</button>
                  </li>
      
                </ul>
              </div>
            
             </div>
             </>
        
          ):(<div className="">
              <button className="btn text-white"   onClick={() =>this.handleModal('loginModalIsOpen', true)}>Login</button>
              <button className="btn  text-white" onClick={() =>this.handleModal('loginModalIsOpen', true)}>Create a Account</button>
          </div>)}
          
            </div>
          </nav>
        </div>{" "}

        <Modal isOpen={loginModalIsOpen} style={customStyles}>
          <div>
            <i
              className="fa-solid fa-xmark"
              style={{ float: "right" }}
              onClick={() => this.handleModal("loginModalIsOpen", false)}
            ></i>
            <div className="loginCont">
              <h2 className="login">Login</h2>
              <div
                className="loginButton google"
                onClick={this.google}
                style={{ cursor: "pointer" }}
              >
                <img
                  src="./Img/google1.png"
                  width={40}
                  height={40}
                  alt=""
                  className="icon"
                />
                <span className="google_span">Continue with Google</span>
              </div>

              <div
                className="loginButton github"
                onClick={this.github}
                style={{ cursor: "pointer" }}
              >
                <img
                  src="./Img/github1.png"
                  width={40}
                  height={40}
                  alt=""
                  className="icon"
                />
                <span className="github_span">Continue with Github</span>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}
