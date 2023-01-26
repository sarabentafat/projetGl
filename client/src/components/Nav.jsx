import React from 'react'
import hand from '../assets/hand.png'
import profilePic from '../assets/profilePic.png'
import addFile from '../assets/addFile.png'
import blueCircle from '../assets/blueCircle.png'
import { Link } from 'react-router-dom'
import AddAnnonce from '../pages/AddAnnonce'

function Nav() {
  return (
    <div className='flex  justify-between mb-5'>
        <div className='flex'><img src={blueCircle} className='w-4 h-4 mt-1 mr-1' alt="" />
         <Link to='/home' >app name</Link>  </div>
        <div className='flex w-4 h-4'>
    
          <img src={hand} alt="" className='animate-bounce  '  />
          
            <div>hi!Ouarda</div>
          </div>
        <div className=''>
            <input className=' border-gray-200 border-2 rounded-lg rounded-r-none p-1 lg:w-[400px]' type="text" placeholder='search ' />
            <button className=' bg-blue-500 text-white p-1 rounded-lg  ml-[-6px] '>search</button>
        </div>
       
        <div className='bg-blue-500 text-white rounded-lg flex '>
        <img src={addFile} alt="create a new announce "  className='p-2'/>
       <h1 className='p-1'>
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