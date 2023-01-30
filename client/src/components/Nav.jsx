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
          <img src={logo} className="w-15 h-10" alt="" />
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
          placeholder="Rechercher  "
        />
        <div className="bg-blue-500 text-white p-2 px-4 rounded-lg rounded-l-none cursor-pointer "><AiOutlineSearch></AiOutlineSearch></div>
      </div>
      <div className="md:flex bg-blue-500 text-white rounded-lg md:px-3 py-1 sm:hidden">
          <Link to="/addannounce">Ajouter une nouvelle annonce</Link>
      </div>
      <div>
        <Link to='/profile'> <img src={profilePic} alt="profile" /></Link>
      </div>
    </div>
  );
}

export default Nav;
