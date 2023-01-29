import React from 'react'
import Card from '../components/Card'
import LeftSideBar from '../components/LeftSideBar'
import Nav from '../components/Nav'
import love from '../assets/love.png'

function Favorites() {
  return (
    <div  className='p-4 mx-10 sm:mx-1  md:text-sm sm:text-xs  sm:ml-2 '>
        <Nav/>
        <div className='flex justify-between '>
            <LeftSideBar/>
           <div>
                <div className='flex'>
                <div className='font-bold mb-5 md:text-sm sm:ml-[15%]'>mes annonces prefevres</div>
                <img src={love} className='w-5 h-5 mx-2' />
                </div>
                
                  <Card/>
           

            </div>
          
        
        
        </div>
     
       
    </div>
  )
}

export default Favorites