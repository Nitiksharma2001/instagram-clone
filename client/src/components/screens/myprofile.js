import React from 'react'

const myprofile = () => {
  return (
	<div style={{maxWidth : "550px", margin : "0 auto"}}>
    <div style={{display : "flex", justifyContent : 'space-around', margin: "18px 0px", borderBottom : "1px solid gray"}}>
      <div>
        <img src="/image.jpg" style={{width : "160px", heigth : "160px", borderRadius : "80px"}}/>
      </div>
      <div>
        <h4>Nitik Sharma</h4>
        <div style={{display : "flex", justifyContent : 'space-between', width: "108%"}}>
          <h6>40 posts</h6>
          <h6>40 followers</h6>
          <h6>40 followings</h6>
        </div>
      </div>
    </div>
      <div className='gallery'>
        <img src="/image.jpg" />
        <img src="/image.jpg" />
        <img src="/image.jpg" />
        <img src="/image.jpg" />
        <img src="/image.jpg" />
      </div>
  </div>
  )
}

export default myprofile