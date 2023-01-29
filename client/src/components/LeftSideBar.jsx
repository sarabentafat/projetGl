import React from 'react'
import home from '../assets/home.png'
import file from '../assets/file.png'
import love from '../assets/love.png'
import notif from '../assets/notif.png'
import exit from '../assets/exit.png'
import selectionner from '../assets/select.png'
import 'tw-elements';
import { Link, Route } from 'react-router-dom'
import Offre from '../pages/Offre'

function LeftSideBar() {
  return (
    <div className='w-[20%] '>
      <p class="">
        <a class="inline-block    focus:outline-none focus:ring-0  transition duration-150 ease-in-out" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          <div className='flex'>
            <img src={home} alt="homepic" className='p-1' />
            <h1>home</h1>
          </div>
        </a>
      </p>
      <div class="collapse" id="collapseExample">

      </div>
      <p class="md:space-x-1 space-y-1 md:space-y-0 mb-4">

      </p>
      <div class="collapse" id="collapseExample">
        <div class=" ">


          <div class="">
            <div className='flex'><img src={selectionner} alt="" className='p-1 mr-1' />
              <h1>selectionner</h1></div>
            <div class=" p-1">
              <select class="
                mb-3
          w-full
    cursor-pointer
      text-gray-700
      border-b-2 border-gray-400 
      transition
      ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                <option selected>module</option>
                <option value="1">math</option>
                <option value="2">arab</option>
                <option value="3">phisik</option>
              </select>
              <select class="
                mb-3
          w-full
    cursor-pointer
      text-gray-700
      border-b-2 border-gray-400 
      transition
      ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                <option selected>commune</option>
                <option value="1">amizour</option>
                <option value="2">akbou</option>
                <option value="3">bejaia</option>
              </select>
              <select class="
              mb-3
          w-full
    cursor-pointer
      text-gray-700
      border-b-2 border-gray-400 
      transition
      ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                <option selected>wilaya</option>
                <option value="1">boumerdess</option>
                <option value="2">mila</option>
                <option value="3">bejaia</option>
              </select>

              <select class="
                mb-3
          w-full
    cursor-pointer
      text-gray-700
      border-b-2 border-gray-400 
      transition
      ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                <option selected>commune</option>
                <option value="1">amizour</option>
                <option value="2">akbou</option>
                <option value="3">bejaia</option>
              </select>
              <div className='flex   mb-3  border-b-2 border-gray-400 '>
                <div className='text-gray-700 mr-2'>depuis </div>
                <input type="date" className='' />
              </div>
              <div className='flex  mb-3   border-b-2 border-gray-400 '>
                <div className='text-gray-700 mr-2'>jusqu'a </div>
                <input type="date" className='' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex'>
        <img src={file} alt="mes annonces" className='p-1 mr-1' />
        <button>mes annonces</button>

      </div>
      <div className='flex'>
        <img src={love} alt="mes favorites" className='p-1 mr-1' />
        <button>mes favorites</button>

      </div>
      <div className='flex'>
        <img src={notif} alt="les offres" className='p-1 mr-1' />
        <button><Link to="/offre">  offres</Link>
        </button>
      </div>
      <div className=' flex bottom-12 absolute'>
        <img src={exit} alt="se deconnecter" className='p-1 mr-1' />

        <button><Link to="/">se deconnecter</Link></button>

      </div>
      {/* <Route path='/offre' component={Offre}></Route> */}


    </div>
  )
}

export default LeftSideBar