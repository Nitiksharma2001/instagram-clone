import './App.css';
import Navbar from './components/navbar.js';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/screens/home.js"
import Login from "./components/screens/login.js"
import Signup from "./components/screens/signup.js"
import Myprofile from "./components/screens/myprofile.js"
import Createpost from "./components/screens/createpost.js"
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path='/' element = {<Home />}></Route>
          <Route path='/login' element = {<Login />}></Route>
          <Route path='/signup' element = {<Signup />}></Route>
          <Route path='/myprofile' element = {<Myprofile />}></Route>
          <Route path='/createpost' element = {<Createpost />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
