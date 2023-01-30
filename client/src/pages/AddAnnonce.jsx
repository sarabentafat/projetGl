import React from "react";
import image from "../assets/image.png";
import LeftSideBar from "../components/LeftSideBar";
import Nav from "../components/Nav";

function AddAnnonce() {
  return (
    <div className="p-4 mx-10 sm:mx-1  md:text-sm sm:text-xs  sm:ml-4 ">
      <Nav />
      <div className="flex">
        <LeftSideBar />
        <div className="md:flex w-full sm:ml-8 ">
          <div className="bg-[var(--primary-color)]  border-2 border-gray-300 border-dashed  md:w-[50%] flex justify-center items-center sm:w-full">
            <div>
              <img
                src={image}
                alt=" add image "
                className="p-3 ml-8 sm:w-[50%] "
              />
              <button className="bg-blue-500 text-white rounded-md px-2 ">
                selectionner des images{" "}
              </button>
              <div className="text-gray-500 text-sm ">
                {" "}
                ou deposer les images ici
              </div>
            </div>
          </div>
          <div className="  p-5 shadow-sm sm:w-full    ">
            <div className="font-bold mb-10 sm:mb-1 sm:w-[90%]  md:w-[300px]">
              remplir les informations qui concerne le cours de soutien
            </div>

            <div class="relative h-11 w-full min-w-[200px] mb-4">
              <input
              id="titre"
                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                titre
              </label>
            </div>
            <div class="relative h-11 w-full min-w-[200px] mb-4">
              <input
              id="description"
                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                description
              </label>
            </div>
            <label className="text-gray-500 text-[14px] focus:outline-none  ">
              <select
                name="annonce"
                className="          
                text-gray-700
           w-full
            cursor-pointer
            text-gray-700
            border-b-2 border-gray-100
           py-2
            transition
            ease-in-out
               focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-2"
                id="catégorie"
              >
                <option value="college">collège </option>
                <option value="lycee">lycée </option>
                <option value="primaire">primaire</option>
              </select>
            </label>
            <label className="text-gray-500 text-[14px] focus:outline-none  ">
              <select
                name="annonce"
<<<<<<< HEAD
                className="     
                mb-4     
            text-gray-700
          w-full
    cursor-pointer
      border-b-2 border-gray-100
      py-2
      transition
      ease-in-out
      focus:text-gray-800 focus:bg-white focus:border-blue-600 focus:outline-none "
                id="modalité"
=======
                className="          
            text-gray-400
            w-full
            cursor-pointer
            text-gray-700
            border-b-2 border-gray-100
            py-2
            transition
            ease-in-out
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                id=""
>>>>>>> eef53bd243932e01621f69add7273aa44759183e
              >
                <option value="online">en ligne </option>
                <option value="offline">hors ligne </option>
              </select>
            </label>
            <div class="relative h-11 w-full min-w-[200px] mb-4 ">
              <input
              id="tarif"
                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                tarif
              </label>
            </div>
            <div class="relative h-11 w-full min-w-[200px] mb-4">
              <input
              id="theme"
                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                thème
              </label>
            </div>
            <div class="relative h-11 w-full min-w-[200px] mb-4">
              <input
              id="wilaya"
                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                wilaya
              </label>
            </div>
            <div class="relative h-11 w-full min-w-[200px] mb-4">
              <input
              id="commune"
                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
               commune
              </label>
            </div>
            <div class="relative h-11 w-full min-w-[200px] mb-">
              <input
              id="bienImmobilier"
                class="text-black peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:borde-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label class=" text-gray-500 after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                adresse du bien immobilier
              </label>
            </div>
            <div className="flex justify-center md:mt-10 sm:mt-2 sm:ml-[-20%] sm:w-[80%]">
              <button id='submit-button' className="bg-blue-500 text-white rounded-md w-[80%] p-1 md:ml-[40%] sm:ml-24">
                publier l'annonce
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AddAnnonce;
