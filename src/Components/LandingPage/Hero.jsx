import React from 'react'
import myImage from '../../assets/bg.png';



function Hero() {
  return (
    <>
    <div className="body">
      <h2 className='herotext'>Track and simplify your finances</h2>
      <h1 className='herotitle'>Master Your Money</h1>
      <div className='box '>
        <div className='box boxinner'>
        <div className=' boxinner2'>
          <img src={myImage} style={{ width: '100%', height: '100%', objectFit:"cover"}} alt="" />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}


export default Hero