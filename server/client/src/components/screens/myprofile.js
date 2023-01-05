import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'

const Myprofile = () => {
  const {state}  = useContext(UserContext)
  const [myPics, setMyPics] = useState([])
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
  return (
	<div style={{maxWidth : "550px", margin : "0 auto"}}>
    <div style={{display : "flex", justifyContent : 'space-around', margin: "18px 0px", borderBottom : "1px solid gray"}}>
      <div>
        <img src="/image.jpg" style={{width : "160px", heigth : "160px", borderRadius : "80px"}}/>
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