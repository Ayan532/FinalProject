import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Details from '../pages/Details';
import Filter from '../pages/Filter';
import Home from '../pages/Home';
import Header from './Header';
function Router() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        
 
        const getUser = () => {
          fetch("http://localhost:4000/auth/login/success", {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          })
            .then((response) => {
              if (response.status === 200) return response.json();
              throw new Error("authentication has been failed!");
            })
            .then((resObject) => {
              setUser(resObject.user);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        getUser();
    }, []);
    return (
        <BrowserRouter>
        <Header user={user}/>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route  path="/details" element={<Details/>} />
                <Route path="/filter" element={<Filter />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;