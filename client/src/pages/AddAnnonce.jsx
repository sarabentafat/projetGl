import React from 'react'
import image from '../assets/image.png'
import LeftSideBar from '../components/LeftSideBar'
import Nav from '../components/Nav'

function AddAnnonce() {
    return (
        <div className='p-4 mx-10 sm:mx-1  md:text-sm sm:text-xs  sm:ml-2 '>
            <Nav />
            <div className='flex'>
                <LeftSideBar />
                <div className='md:flex w-full sm:ml-8'>
                    <div className='bg-[var(--primary-color)]  border-2 border-gray-300 border-dashed  md:w-[50%] flex justify-center items-center sm:w-[90%] '>
                        <div>
                            <img src={image} alt=" add image " className='p-3 ml-8 sm:w-[50%] ' />
                            <button className='bg-blue-500 text-white rounded-md px-2 '>selectionner des images </button>
                            <div className='text-gray-500 text-sm '>  ou deposer les images ici</div>
                        </div>
                    </div>
                    <div className=' md:w-[50%] p-5 shadow-sm sm:w-[320px] sm:ml-[-20px] md:ml-[5px] '>
                        <div className='font-bold mb-10 sm:mb-1 sm:w-[90%]  md:w-[300px]'>remplir les informations qui concerne le cours de soutien 
                        </div>

                        <div class="relative h-11 w-full min-w-[200px] mb-4">
                            <input
                                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                            <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                titre
                            </label>

                        </div>
                        <div class="relative h-11 w-full min-w-[200px] mb-4">
                            <input
                                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                            <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                decreption
                            </label>

                        </div>
                        <label  className='text-gray-500 text-[14px] focus:outline-none  '>
                                <select name="annonce" className='          
            text-gray-400
          w-full
    cursor-pointer
      text-gray-700
      border-b-2 border-gray-100
      py-2
      transition
      ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-2' id="">
                                    <option value="">college </option>
                                    <option value="">lycee </option>
                                    <option value="">primaire</option>
                                </select>
                             
                            </label>
                            <label  className='text-gray-500 text-[14px] focus:outline-none  '>
                                <select name="annonce" className='          
            text-gray-400
          w-full
    cursor-pointer
      text-gray-700
      border-b-2 border-gray-100
      py-2
      transition
      ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ' id="">
                                    <option value="">online </option>
                                    <option value="">offline </option>
                                </select>      
                            </label>
                        <div class="relative h-11 w-full min-w-[200px] mb-4 ">
                            <input
                                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                            <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                prix
                            </label>
                        </div>
                        <div class="relative h-11 w-full min-w-[200px] mb-4">
                            <input
                                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                            <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                theme
                            </label>

                        </div>
                        <div class="relative h-11 w-full min-w-[200px] mb-">
                            <input
                                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                            <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                lieu exact
                            </label>

                        </div>
                        <div className='flex justify-center md:mt-10 sm:mt-2 sm:ml-[-20%] sm:w-[80%]'>
                            <button className='bg-blue-500 text-white rounded-md w-[50%] sm:p-1'>partager l'annonce</button>
                        </div>

                    </div>
                </div>


            </div>

        </div>
    )
}

export default AddAnnonce