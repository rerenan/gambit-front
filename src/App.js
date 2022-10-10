import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login/index';
import Register from './pages/Register';
import User from './pages/User';
import UserContext from "./contexts/userContext";
import axios from 'axios';

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState("");
  
 const userContext = {
  token,
  setToken,
  user,
  setUser
 
 }
 useEffect(() => {
  if(token){
      getUser();
  }
}, [token]);

async function getUser(){
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
  try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/me`,
        config
      );
      setUser(response.data);
    } catch (e) {
      alert(e);
      console.log(e);
      localStorage.removeItem("authToken")
      window.location.reload()
    }
}
  return (
   <BrowserRouter>
   <UserContext.Provider value={userContext}>
   <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/:username" element={<User/>}/>
   </Routes>
   </UserContext.Provider>
   </BrowserRouter>
  );
}

export default App;
