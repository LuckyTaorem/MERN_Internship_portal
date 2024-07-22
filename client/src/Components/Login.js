import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from "axios"
import '../App.css';
export default function Login() {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate()
    Axios.defaults.withCredentials = true

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email || !password){
            setError("Please fill all the fields")
            return
        }
        Axios.post(`${serverUrl}/auth/login`,{
            email,
            password
        }).then(response =>{
            if(response.data.status){
                navigate("/dashboard")
            }
        }).catch(err=>{
            setError("Error occured,please try later")
        })
    }
  return (
    <>
    <div className='login_main'>
        <div className='login_container'>
        <h2>Login </h2>
        <form className='login_form' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email" placeholder="Email" 
                value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" placeholder="Password" 
                value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
            </div>
            <button className='login_btn'>Login</button>
            <div>
                <p>Are You New here?</p>
                <button type='submit' onClick={()=>navigate("/signup")}>SignUp</button>
            </div>
            {error && <p>{error}</p>}
        </form>
        </div>
    </div>
    </>
  )
}