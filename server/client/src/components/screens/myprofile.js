import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'

const Myprofile = () => {
  const {state, dispatch}  = useContext(UserContext)
  const [myPics, setMyPics] = useState([])
  const [image, setImage] = useState("");
  useEffect(() => {
    fetch("http://localhost:4000/myposts", {
      method:"GET",
      headers:{
        "Content-Type":"Application/json",
        "authorization":"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(resp => resp.json())
    .then(res => {
      setMyPics(res.post)
    })
  }, [])
  useEffect(() => {
    if(image){
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
        .then((data) => {
          fetch("http://localhost:4000/updatepic", {
          method:"PUT",
          headers:{
            "Content-Type":"Application/json",
            "authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({pic:data.url})
        })
        .then(resp => resp.json())
        .then(res => {
          localStorage.setItem("user", JSON.stringify({...state, pic:data.url }))
          dispatch({type:"UPDATEDPIC", payload:data.url})
          window.location.reload()
        })
      })
      .catch(err => console.log(err))
    }
  }, [image])
  return (
	<div style={{maxWidth : "550px", margin : "0 auto"}}>
    <div style={{display : "flex", justifyContent : 'space-around', margin: "18px 0px", borderBottom : "1px solid gray"}}>
      <div>
        <img src={state?state.pic:"loading"} style={{width : "160px", heigth : "160px", borderRadius : "80px"}}/>
        <div className="file-field input-field">
          <div className="btn">
            <span>Upload Pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files)} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <div>
        <h4>{state?state.name:"loading"}</h4>
        <h5>{state?state.email:"loading"}</h5>
        <div style={{display : "flex", justifyContent : 'space-between', width: "108%"}}>
          <h6>{myPics.length} posts</h6>
          <h6>{state?state.followers.length:0} followers</h6>
          <h6>{state?state.followings.length:0} followings</h6>
        </div>
      </div>
    </div>
      <div className='gallery'>
        {myPics.map(item => {
          return(
            <img className="item" key={item._id} src={item.imageUrl} alt={item.title}/>
          )
        })}
      </div>
  </div>
  )
}

export default Myprofile