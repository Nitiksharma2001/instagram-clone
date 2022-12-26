import React, { useState, useEffect } from 'react'
import axios from "axios"
import {useNavigate } from 'react-router-dom'
import M from "materialize-css"

const Createpost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    // adding post to db
    if(imgUrl){
      const uploadDb = async () =>{
        try{
          const resp = await axios.post("http://localhost:4000/createpost", {
            title, body, imgUrl
          })
          M.toast({html: resp.data.message, classes:"#1e88e5 blue darken-1"});
          navigate("/")
        }
        catch(err) {
          M.toast({html: err.response.data.error.message, classes:"#1e88e5 blue darken-1"});
        }
      }
      uploadDb();
    }
  }, [imgUrl])

  const postDetails = async () => {
    try{
      const formData = new FormData()
      formData.append("file", image[0]);
      formData.append("upload_preset", "insta-clone");
      // uploading image to cloudinary db
      const resp = await axios.post("https://api.cloudinary.com/v1_1/dctcobaim/image/upload", {body : formData});
    }
    catch(err) {
      console.log(err)
    }
  }
  return (
    <div className="card input-filed" style={{margin : "10px auto", maxWidth : "500px", padding : "20px", textAlign:"center"}}>
      <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)}/>
      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input type="file" onChange={(e) => setImage(e.target.files)} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text"/>
        </div>
      </div>
      <button onClick={postDetails} className="btn waves-effect waves-light #123" type="onclick" name="action">submit post</button>
    </div>
  )
}

export default Createpost