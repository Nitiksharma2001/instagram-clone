import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../App'

const Myprofile = () => {
  const {state, dispatch}  = useContext(UserContext)
  const [userProfile, setUserProfile] = useState(null)
  const {id} = useParams()
  const [showFollow, setShowFollow] = useState(state? !state.followings.includes(id):true)
  useEffect(() => {
    fetch(`http://localhost:4000/user/${id}`, {
      method:"GET",
      headers:{
        "Content-Type":"Application/json",
        "authorization":"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(resp => resp.json())
    .then(result => {
		setUserProfile(result)
		console.log(result);
    })
  }, [])
  const followUser = ()=>{
	fetch(`http://localhost:4000/follow`, {
      method:"PUT",
      headers:{
        "Content-Type":"Application/json",
        "authorization":"Bearer "+localStorage.getItem("jwt")
      },
	  body:JSON.stringify({followId:id})
    })
    .then(resp => resp.json())
    .then(result => {
      dispatch({type:"UPDATE", payload:{followings:result.followings, followers:result.followers}})
      localStorage.setItem("user", JSON.stringify(result))
      setUserProfile((prevState) => {
        return{
          ...prevState,
          user:{
            ...prevState.user,
            followers:[...prevState.user.followers, result._id]
          }
        }
      })
      setShowFollow(false)
    })
  }
  const unFollowUser = ()=>{
	fetch(`http://localhost:4000/unfollow`, {
      method:"PUT",
      headers:{
        "Content-Type":"Application/json",
        "authorization":"Bearer "+localStorage.getItem("jwt")
      },
	  body:JSON.stringify({followId:id})
    })
    .then(resp => resp.json())
    .then(result => {
      dispatch({type:"UPDATE", payload:{followings:result.followings, followers:result.followers}})
      localStorage.setItem("user", JSON.stringify(result))
      setUserProfile((prevState) => {
        return{
          ...prevState,
          user:{
            ...prevState.user,
            followers: prevState.user.followers.filter(item => {
              return item !== result._id
            })
          }
        }
      })
      setShowFollow(true)
    })
  }
  return (
	<>
		{userProfile? <div style={{maxWidth : "550px", margin : "0 auto"}}>
		<div style={{display : "flex", justifyContent : 'space-around', margin: "18px 0px", borderBottom : "1px solid gray"}}>
		<div>
			<img src="/image.jpg" style={{width : "160px", heigth : "160px", borderRadius : "80px"}}/>
		</div>
		<div>
			<h4>{userProfile.user.name}</h4>
			<h5>{userProfile.user.email}</h5>
			<div style={{display : "flex", justifyContent : 'space-between', width: "108%"}}>
			<h6>{userProfile.user.email}</h6>
			<h6>{userProfile.user.followers.length} followers</h6>
			<h6>{userProfile.user.followings.length} followings</h6>
			</div>
      {showFollow ?
			<button
          onClick={followUser}
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          follow
        </button> :
			<button
          onClick={unFollowUser}
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          UnFollow 
        </button>
         }
		</div>
		</div>
		<div className='gallery'>
			{userProfile.posts.map(item => {
			return(
				<img className="item" key={item._id} src={item.imageUrl} alt={item.title}/>
			)
			})}
		</div>
	</div>:<h2>loading</h2>}
	</>
  )
}

export default Myprofile