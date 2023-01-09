import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined)
  useEffect(() => {
    uploadFields();
  },[url])
  const uploadFields = ()=>{
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, pic:url }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#1e88e5 blue darken-1" });
        } else {
          M.toast({ html: data.message, classes: "#1e88e5 blue darken-1" });
          navigate("/login");
        }
      });
  }
  const postData = () => {
    if(image){
      uploadPic();
    }
    else{
      uploadFields();
    }
  };
  const uploadPic = () => {
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "insta-clone");
    // uploading image to cloudinary db
    const config = {
      method: "POST",
      body: formData,
    };
    const cloudUrl = "https://api.cloudinary.com/v1_1/dcf7v7xil/image/upload";
    fetch(cloudUrl, config)
      .then((resp) => resp.json())
      .then((data) => setUrl(data.url))
      .catch(err => console.log(err))
  };
  return (
    <div className="card mycard">
      <div className="card-content auth-card input-field">
        <h2>SignUp</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn">
            <span>Upload Pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files)} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={postData}
        >
          signup
        </button>
        <h5>
          <Link to="/login">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
