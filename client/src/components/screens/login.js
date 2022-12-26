import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import M from "materialize-css"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = async () => {
    try{
      const resp = await axios.post("http://localhost:4000/signin", {
        email, password
      })
      localStorage.setItem("jwt", resp.data.token);
      localStorage.setItem("user", resp.data.user);
      M.toast({html: "successfully signedIn", classes:"#1e88e5 blue darken-1"});
      navigate("/")
    }
    catch(err){
      M.toast({html: err.response.data.error, classes:"#1e88e5 blue darken-1"});
    }
  }
  return (
    <div className="card mycard">
      <div className="card-content auth-card input-field">
        <h2>Login</h2>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={postData} className="btn waves-effect waves-light" type="submit" name="action">
        login 
        </button>
        <h5><Link to="/signup">Don't have an account?</Link></h5>
      </div>
    </div>
  );
};

export default Login;
