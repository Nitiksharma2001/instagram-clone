import React from 'react'

const Home = () => {
  
  return (
	<div className='home'>
    <div className="card home-card">
      <h5>Nitik</h5>
      <div className="card-image">
        <img src="/image.jpg" alt="" />
      </div>
      <div className="card-content">
      <i className="material-icons" style={{color : "red"}}>favorite</i>
        <h6>title</h6>
        <p>this is amazing</p>
        <input type="text" placeholder='add a comment' />
      </div>
    </div>
  </div>
  )
}

export default Home