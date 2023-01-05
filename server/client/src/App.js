import { createContext, useEffect, useReducer } from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
import Navbar from './components/navbar.js';
import Home from "./components/screens/home.js"
import Login from "./components/screens/login.js"
import Signup from "./components/screens/signup.js"
import Myprofile from "./components/screens/myprofile.js"
import Createpost from "./components/screens/createpost.js"
import Profile from "./components/screens/profile.js"
import FollowingUser from "./components/screens/followingsPosts"
import './App.css';
import {reducer, initialState } from './components/reducers/userReducer.js';
export const UserContext = createContext()

const Routing = ()=>{
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER", payload:user})
      navigate("/");
    }
    else{
      navigate("/login")
    }
  }, [])
  return (
      <Routes>
        <Route path='/' element = {<Home />}></Route>
        <Route path='/login' element = {<Login />}></Route>
        <Route path='/signup' element = {<Signup />}></Route>
        <Route path='/myprofile' element = {<Myprofile />}></Route>
        <Route path='/createpost' element = {<Createpost />}></Route>
        <Route path='/profile/:id' element = {<Profile />}></Route>
        <Route path='/myfollowingsposts' element = {<FollowingUser />}></Route>
      </Routes>
  )
}
const App = ()=>{
  const [state, dispatch] = useReducer(reducer, initialState)
  const user = JSON.parse(localStorage.getItem("user"));
  if(!state && user){
    dispatch({type:"USER", payload:user})
  }
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
