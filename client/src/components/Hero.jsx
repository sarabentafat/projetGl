import React from 'react'
import Card from './Card'
import LeftSideBar from './LeftSideBar'

function Hero() {
  return (
    <div className='flex'>
        <LeftSideBar/>
        <Card/>

    </div>
  )
}

export default Hero