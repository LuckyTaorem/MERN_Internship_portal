import axios from 'axios';
import { useEffect, useState } from 'react';
import Axios from 'axios'

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [gravatarUrl, setGravatarUrl] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/auth/profile')
      .then(response => {
        setUserData(response.data.user);
        setGravatarUrl(response.data.gravatarUrl);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
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
  }, [userData]);
  const [error,setError] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    if(!username){
        setError("Username fields can't be empty!")
        return;
    }
    Axios.post("http://localhost:3000/auth/profileUpdate",{
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>Profile Details</h1>
      {error && <p>{error}</p>}
      {console.log(gravatarUrl)}
      <div>
      <img src={gravatarUrl} alt="Gravatar" width='100' height='100' onClick={()=>{setError("To change the photo: Visit https://gravatar.com/")}} />
      </div>
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
      <input type="hidden" value={password} />
      <button>Update</button>
      </form>
    </div>
  );
};

export default Profile;