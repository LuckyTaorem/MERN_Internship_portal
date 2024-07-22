import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [error,setError] = useState("");
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        if(!username || !email || !password){
            setError("Please fill all the fields")
            return;
        }
        Axios.post(`${serverUrl}/auth/signup`,{
            username,
            email,
            password
        }).then((res)=>{
            if(res.data.status){
                navigate("/login")
            }
        }).catch(()=>{
            setError("Internal Error Occured, Please try Again.")
        })
    }
  return (
    <>
    <div className='login_main'>
        <div className='login_container'>
        <h2>SignUp</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username: </label>
                <input type="text" placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </div>
            <button className='login_btn'>SignUp</button>
            <div>
                <p>Already have an account?</p>
                <button type='submit' onClick={()=>navigate("/login")}>Login</button>
            </div>
            {error && <p>{error}</p>}
        </form>
        </div>
    </div>
    </>
  )
}
