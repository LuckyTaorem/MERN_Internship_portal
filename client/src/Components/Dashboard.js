import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import '../App.css';
import Cookies from 'js-cookie';

export default function Dashboard() {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
    const [appliedOppurtunites,setAppliedOppurtunities] = useState([])
    const navigate = useNavigate()

    const [userData, setUserData] = useState({});
    const [gravatarUrl, setGravatarUrl] = useState(Cookies.get('gravatar'));
    
    useEffect(() => {
      const interval = setInterval(() => {
      const newCookieValue = Cookies.get('gravatar');
        setGravatarUrl(newCookieValue);
      }, 1000);
      return () => clearInterval(interval);
    }, [gravatarUrl]);

    useEffect(() => {
      axios.get(`${serverUrl}/auth/profile`)
        .then(response => {
          setUserData(response.data.user);
        })
        .catch(error => {
          console.error(error);
        },[]);
    });

      const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [dob, setDob] = useState("");
      const [address, setAddress] = useState("");
      
      useEffect(() => {
        if(userData){
       if (userData.username) {
          setUsername(userData.username);
        }
        if (userData.email) {
            setEmail(userData.email);
          }
        if (userData.password) {
            setPassword(userData.password);
          } 
        if (userData.dob) {
            setDob(new Date(userData.dob).toISOString().split('T')[0]);
          }
        if (userData.address) {
            setAddress(userData.address);
          }
        }
      }, [userData]);

      const [error,setError] = useState("");
    
      function handleSubmit(e){
        e.preventDefault();
        if(!username){
            setError("Username fields can't be empty!")
            return;
        }
        axios.post(`${serverUrl}/auth/profileUpdate`,{
            username,
            email,
            password,
            dob,
            address
        }).then((res)=>{
            setError("You have Updated Successfully")
        }).catch(()=>{
            setError("Internal Error Occured, Please try Again.")
        })
    }
    useEffect(()=>{
        // axios.get(`${serverUrl}/auth/verify`).then((res)=>{
           if(!userData){
            navigate("/login")
           } else {
            fetchAppliedOppurtunities()
           }
        // })
    })
    const fetchAppliedOppurtunities =async()=>{
        try {
            const response = await axios.get(`${serverUrl}/auth/applied-oppurtunities`)
            setAppliedOppurtunities(response.data)
        } catch (error) {
            
        }
    }
    const removeAppliedOppurtunity = async (oppurtunityId) => {
        try {
          await axios.delete(`${serverUrl}/auth/remove/${oppurtunityId}`).then((res)=>{
            console.log(res);
          })
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <>
    <div className='dash_container'>
         <h1>Dashboard</h1>
         <div>
      <form onSubmit={handleSubmit} className='profile'>
      <h1>Profile Details</h1>
      {error && <p>{error}</p>}
      <div>
      <img src={gravatarUrl} alt="Gravatar" width='120' height='120' onClick={()=>{setError("To change the photo: Visit https://gravatar.com/")}} />
      </div>
      <div className='profile_details'>
      <div>
        <label htmlFor="username">UserName:</label>
        <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input type='email' value={email} disabled />
      </div>
      <div>
        <label htmlFor="dob">Date of Birth:</label>
        <input type='date' value={dob} onChange={(e)=>{setDob(e.target.value)}}/>
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <textarea value={address} onChange={(e)=>{setAddress(e.target.value)}}></textarea>
      </div>
      </div>
      <input type="hidden" value={password} />
      <button type='submit'>Update</button>
      </form>
    </div>
    <div className='home_container'>
        {appliedOppurtunites.length===0 ? (<h1 style={{marginTop:"20px"}}>You have not applied for any Opportunity</h1>):
         (<h1 style={{marginTop:"20px"}}>Applied Opportunities</h1>)
        }
         <div className='cards'>
            {Array.isArray(appliedOppurtunites)? appliedOppurtunites.map((oppurtunity,index)=>(
                <div key={index} className='card'>
                     <h1>{oppurtunity.profile_name}</h1>
                     <p><strong>Company: </strong> {oppurtunity.company_name}</p>
                     <p><strong>Stipend: </strong> {oppurtunity.stipend}</p>
                     <p><strong>Duration: </strong> {oppurtunity.duration}</p>
                     <p><strong>Start Date: </strong> {oppurtunity.start_date}</p>
                    <button onClick={()=>removeAppliedOppurtunity(oppurtunity.id)}>Remove Now</button>
                    
                </div>
            )):null};
         </div>
    </div>
    </div>
    </>
  )
}