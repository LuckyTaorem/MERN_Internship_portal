import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../App.css';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Navbar() {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [gravatarUrl, setGravatarUrl] = useState(Cookies.get('gravatar'));
  const navigate = useNavigate()
    
  // const [cookieValue, setCookieValue] = useState(Cookies.get('token'));
  useEffect(() => {
    const interval = setInterval(() => {
    const newCookieValue = Cookies.get('gravatar');
    if (newCookieValue !== cookieValue) {
      setGravatarUrl(newCookieValue);
    }
    }, 10);
    return () => clearInterval(interval);
  }, [gravatarUrl]);

    console.log(gravatarUrl);
  const [cookieValue, setCookieValue] = useState(Cookies.get('token'));
  useEffect(() => {
    const interval = setInterval(() => {
    const newCookieValue = Cookies.get('token');
    if (newCookieValue !== cookieValue) {
      setCookieValue(newCookieValue);
    }
    }, 10);
    return () => clearInterval(interval);
  }, [cookieValue]);

  const handleLogout=()=>{
    <Navbar isLoggedIn={false}/>
      axios.get(`${serverUrl}/auth/logout`)
      .then((res)=>{
          if(res.data.status){
              navigate("/login")
          }
      }).catch((err)=>{
          console.log(err)
      })
  }

  return (
    <div className='nav_container'>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
        {cookieValue ? (
          <>
            <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
                <input type='submit' className='logout' onClick={handleLogout} value="Logout"/>
            </li>
            <li>
              <img style={{borderRadius:"50%",border:"1px solid red"}} src={gravatarUrl} alt="Gravatar" width='33' height='33' onClick={()=>{navigate("/dashboard")}}/>
            </li>
            </>
         ) :(
           <>
             <li>
                <NavLink to="/signup">Signup</NavLink>
            </li>
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
           </>
            
        )}
        </ul>
    </div>
  )
}
