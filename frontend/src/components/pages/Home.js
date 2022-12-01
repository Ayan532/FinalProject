import React from 'react';
import QuickSearch from '../layout/QuickSearch';
import Welcome from '../layout/Welcome';
import '../styles/Home.css'
import axios from 'axios'
class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            locations: [],
            mealtypes: [],
            loginModalIsOpen: false,
            user:undefined
        }
    }
    componentDidMount(){
         sessionStorage.clear();
        axios({
            url: 'http://localhost:4000/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({ locations: res.data.Locations})
        })
        .catch(err => console.log(err))

        axios({
            url: 'http://localhost:4000/mealtypes',
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({ mealtypes: res.data.mealTypes})
        })
        .catch(err => console.log(err))
    }
    // handleLogout = () => {
    //     window.open("http://localhost:4000/auth/logout", "_self");
    // }

    // google = () => {
    //     window.open("http://localhost:4000/auth/google", "_self");
    // };
    // github = () => {
    //     window.open("http://localhost:4000/auth/github", "_self");
    // };

    // handleModal = (state, value) => {
    //     this.setState({ [state]: value });
    //   }
    render(){
        const { locations, mealtypes} = this.state;
        const {user}=this.props;
        return(
            <div>
             <Welcome locations={locations} 
            //  github={this.github} handleLogout={this.handleLogout} user={user} google={this.google} loginModalIsOpen={loginModalIsOpen} handleModal={this.handleModal}
            />
             <QuickSearch mealtypes={mealtypes}/>
   
            </div>
        )
    }
}

export default Home
