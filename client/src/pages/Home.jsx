import React from 'react'
import Card from '../components/Card'
import LeftSideBar from '../components/LeftSideBar'
import Nav from '../components/Nav'

function Home() {
  return (
    <div  className='p-4 mx-10  '>
        <Nav/>
        <div className='flex justify-between '>
            <LeftSideBar/>
           <Card/>
        
        
        </div>
     
       
    </div>
  )
}

export default Home