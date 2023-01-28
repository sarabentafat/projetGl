import React from 'react'
import hand from '../assets/hand.png'
import profilePic from '../assets/profilePic.png'
import addFile from '../assets/addFile.png'
import blueCircle from '../assets/blueCircle.png'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.png'

function Nav() {
  return (
    <div className='flex  justify-between mb-5 '>
      <div className='flex'>
        <Link to='/home' ><img src={logo} className='w-15 h-8' alt="" /></Link>  </div>
      <div className='md:flex w-4 h-4 sm:hidden md:block '>
       <img src={hand} alt="" className='animate-bounce ' />
        <div className=''>hi!Ouarda</div>
      </div>
      <div className=''>
        <input className=' border-gray-200 border-2 rounded-lg rounded-r-none p-1 lg:w-[400px] sm:w-[100px]' type="text" placeholder='search ' />
        <button className=' bg-blue-500 text-white p-1 rounded-lg  ml-[-6px] sm:w-[5%px] '>search</button>
      </div>

    <div className='md:flex bg-blue-500 text-white rounded-lg sm:hidden md:block md:text-sm md:w-[20%] md:h-[40px] '>
        <img src={addFile} alt="create a new announce " className='p-2' />
        <h1 className='lg:p-2'>
          <Link to='/addannounce'>create new annonce</Link>
        </h1>
      </div>
      <div>
        <img src={profilePic} alt="" />
      </div>
    </div>
  )
}

export default Nav