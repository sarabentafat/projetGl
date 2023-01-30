import React from "react";
import hand from "../assets/hand.png";
import profilePic from "../assets/profilePic.png";
import addFile from "../assets/addFile.png";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../assets/logo.png";
function Nav() {
  return (
    <div className="flex  justify-between mb-5 ">
      <div className="flex">
        <Link to="/home">
          <img src={logo} className="w-15 h-8" alt="" />
        </Link>{" "}
      </div>
      <div className="md:flex w-4 h-4 sm:hidden md:block ">
        <img src={hand} alt="" className="animate-bounce " />
        <div className="py-2 ml-1">hi!Ouarda</div>
      </div>
      <div className="flex ">
        <input
          className=" sm:w-[60%] md:w-[80%] border-gray-200 border-2 rounded-lg rounded-r-none p-1 lg:w-[70%] ml-6 "
          type="text"
          placeholder="Rechercher des annonces"
        />
        <div className="bg-blue-500 text-white p-2 rounded-lg rounded-l-none cursor-pointer "><AiOutlineSearch></AiOutlineSearch></div>

      </div>

      <div className="md:flex bg-blue-500 text-white rounded-lg sm:hidden md:block md:text-sm md:w-[20%] md:h-[40px] ">
        <img src={addFile} alt="create a new announce " className="p-2" />
        <h1 className="px-3 py-1">
          <Link to="/addannounce">ajouter une annonce</Link>
        </h1>
      </div>
      <div>
        <img src={profilePic} alt="userpic" />
      </div>
    </div>
  );
}

export default Nav;
