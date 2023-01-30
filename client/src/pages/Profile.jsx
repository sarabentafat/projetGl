import React, { useContext } from "react";
import AddAnnonce from "../pages/AddAnnonce";
import Card from "../components/Card";
import Hero from "../components/Hero";
import LeftSideBar from "../components/LeftSideBar";
import Nav from "../components/Nav";
import Offre from "./Offre";
import profilePic from "../assets/profilePic.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "../context/Context";

//{user},{user.prenom}
function Profile() {
  const { user } = useContext(Context);
  console.log(user);

  return (
    <div className="p-4 mx-10 sm:mx-1  md:text-sm sm:text-xs  sm:ml-2 ">
      <Nav />
      <div className="flex">
        <LeftSideBar />
        <div className="flex  items-center p-4  bg-slate-100 rounded-lg sm:ml-5 mt-7 ">
          <div className="mr-4">
            <h1 className="text-xl font-bold">
              Nom :{" "}
              <span className="text-lg text-gray-600 "> {user.prenom}</span>
            </h1>
            <h1 className="text-xl font-bold">
              Prénom:
              <span className="text-lg text-gray-600 "> {user.nom}</span>{" "}
            </h1>
            <p className="text-xl font-bold">
              Email :
              <span className="text-lg text-gray-600 "> {user.email}</span>
            </p>
            <p className="text-xl font-bold">
              Téléphone :{" "}
              <span className="text-lg text-gray-600 "> 0789985558</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
