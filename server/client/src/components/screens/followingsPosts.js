import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
const Home = () => {
  const [data, setData] = useState([]);
  const {state} = useContext(UserContext)
  useEffect(() => {
    fetch("http://localhost:4000/getposts", {
      headers:{
        "Content-Type":"Application/json",
        "authorization":"Bearer "+localStorage.getItem("jwt")
      },
      method:"GET",
    })
    .then(resp => resp.json())
    .then(result => {
      setData(result.posts)
    })
  }, [])

  const likePost = (id)=>{
    fetch("http://localhost:4000/like",{
      method:"PUT",
      headers:{
        "Content-Type":"Application/json",
        "authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({postId:id}),
    })
    .then(resp=>resp.json())
    .then(res => {
      const newData = data.map(item => {
        if(item._id === res._id){
          return res;
        }
        return item;
      })
      setData(newData)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const unlikePost = (id)=>{
    fetch("http://localhost:4000/unlike",{
      method:"put",
      headers:{
        "Content-Type":"Application/json",
        "authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({postId:id}),
    })
    .then(resp=>resp.json())
    .then(res => {
      const newData = data.map(item => {
        if(item._id === res._id){
          return res;
        }
        return item;
      })
      setData(newData)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const makeComment = (text, id)=>{
    fetch("http://localhost:4000/comment",{
      method:"put",
      headers:{
        "Content-Type":"Application/json",
        "authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({text, postId:id}),
    })
    .then(resp=>resp.json())
    .then(res => {
      const newData = data.map(item => {
        if(item._id === res._id){
          return res;
        }
        return item;
      })
      setData(newData)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const deletePost = (id)=>{
    fetch("http://localhost:4000/delete/"+id,{
      method:"DELETE",
      headers:{
        "Content-Type":"Application/json",
        "authorization":"Bearer "+localStorage.getItem("jwt")
      },
    })
    .then(resp=>resp.json())
    .then(res => {
      const newData = data.filter(item => 
        item._id !== res._id
      )
      setData(newData)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const deleteComment = (postId, cmntId)=>{
    fetch("http://localhost:4000/deletecomment/"+postId,{
      method:"DELETE",
      headers:{
        "Content-Type":"Application/json",
        "authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({cmntId})
    })
    .then(resp=>resp.json())
    .then(res => {
      const newData = data.map(item => {
        if(item._id === res._id){
          return res;
        }
        return item
      })
      setData(newData)
    })
    .catch(err => {
      console.loag(err)
    })
  }

  return (
	<div className='home'>
    {data.map(item => {
      return(
        <div className="card home-card" key={item._id}>
          <h5><Link to={item.postedBy._id !== state._id?`/profile/${item.postedBy._id}`:`myprofile/`}>{item.postedBy.name}</Link>
          {state._id == item.postedBy._id && <i style={{float:"right"}} className="material-icons" onClick={() => deletePost(item._id)}>delete</i>}
          </h5>
          <div className="card-image">
            <img src={item.imageUrl} alt="" />
          </div>
          <div className="card-content">
          <i className="material-icons" style={{color : "red"}}>favorite</i>
          {item.likes.includes(state._id)
          ?<i className="material-icons" onClick={() => unlikePost(item._id)}>thumb_down</i>
          :<i className="material-icons" onClick={() => likePost(item._id)}>thumb_up</i>
            }
          
          <h6>{item.likes.length} Likes</h6>
            <h6>{item.title}</h6>
            <p>{item.body}</p>
            {item.comments.map(record => {
              return (
                <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name+": "}</span>{record.text} 
                <i style={{float:"right"}} className="material-icons" onClick={() => deleteComment(item._id, record._id)}>delete</i></h6> 
              )
            })}
            <form onSubmit={(e) => {
              e.preventDefault();
              makeComment(e.target[0].value, item._id)
              e.target[0].value = ""
            }}>
            <input type="text" placeholder='add a comment' />

            </form>
          </div>
        </div>
      )
    })}
  </div>
  )
}

export default Home