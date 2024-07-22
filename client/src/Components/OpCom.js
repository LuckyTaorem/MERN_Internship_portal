import React, { useEffect, useState } from 'react'
import oppurtunitiesData from "../op.json"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import '../App.css';

const serverUrl = process.env.REACT_APP_SERVER_URL;
export default function OpCom() {
  const [appliedOppurtunities,setAppliedOppurtunities] =  useState([])
  useEffect(()=>{
    fetchAppliedOppurtunities()
  },[])
  const fetchAppliedOppurtunities=async()=>{
    try {
      const response =await axios.get(`${serverUrl}/auth/applied-oppurtunities`)
    setAppliedOppurtunities(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <div className='home_container'>
       <h1>Internship Opportunities</h1>
       <div className='cards'>
        {Object.values(oppurtunitiesData.internships_meta).map(oppurtunity=>(
            <OppurtunityCard key={oppurtunity.id} oppurtunity={oppurtunity} 
            appliedOppurtunities={appliedOppurtunities}/>
        ))}
       </div>
    </div>
    </>
  )
}

const OppurtunityCard = ({oppurtunity,appliedOppurtunities})=>{
  const navigate = useNavigate()
  const {
     id,
     profile_name,
     company_name,
     stipend,
     start_date,
     locations,
     duration
  } = oppurtunity
 const isApplied =Array.isArray(appliedOppurtunities) && appliedOppurtunities.some(item=>item.id === id)

  const applyForOppurtunity= (oppurtunity)=>{
      try {
         axios.post(`${serverUrl}/auth/apply`,{oppurtunity}).then((res)=>{
          console.log(res)
         })
         navigate("/dashboard")

      } catch (error) {
        console.log(error)
      }
  }
  return(
    <div>
    <div className='card'>
      <h1>{profile_name}</h1>
      <div className='card_details'>
      <p><strong>Company: </strong> {company_name}</p>
      <p><strong>Stipend: </strong> {stipend.salary}</p>
      <p><strong>Location: </strong> {locations.map(location=>location.string).join(', ')}</p>
      <p><strong>Duration: </strong> {duration}</p>
      <p><strong>Start Date: </strong> {start_date}</p>
      {isApplied ? (
        <button disabled>Applied</button>
      ): (
        <button onClick={()=>applyForOppurtunity(oppurtunity)}>Apply Now</button>
      )}
      </div>
      </div>
    </div>
  )
}