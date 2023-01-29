import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import profilePic from "../assets/profilePic.png";
import Nav from "../components/Nav";

function Offre() {
  return (
    <div className="p-4 mx-10  sm:mx-1  md:text-sm sm:text-xs">
      <Nav />
      <div className="flex ">
        <LeftSideBar />
        <div className="md:flex  md:w-full  md:h-[630px] sm:h-[300px]  pl-2 ">
          <div className=" md:p-2 md:w-[50%]">
            <div className="flex hover:bg-[var(--primary-color)] cursor-pointer rounded-sm  ">
              <img src={profilePic} alt="" className="w-8 h-8 mt-2 ml-1" />
              <div className="ml-2">
                <h1> ouarda a demanader un offre </h1>
                <p className="text-gray-500 text-thin">12 hours ago</p>
              </div>
            </div>
          </div>
          <div className=" md:h-full md:w-[50%] pl-4 mt-2 ">
            <div className="flex justify-center items-center h-[50%] mb-1 sm:mb-3 bg-[var(--primary-color)] shadow-md rounded-sm shadow-slate-300 sm:p-3">
              <div>
                <div className="font-bold mb-3">information sur lannonce</div>
                <div className="flex">
                  <div className="mr-4">
                    <div>categorie</div>
                    <div>prix</div>
                    <div>lieu</div>
                  </div>
                  <div className="text-blue-500">
                    <div>lyycee</div>
                    <div>1500dz/mois </div>
                    <div>math</div>
                    <div>estif algeria</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center h-[50%] mb-1 bg-[var(--primary-color)] shadow-md rounded-sm shadow-slate-300 sm:p-3">
              <div>
                <div className="font-bold mb-3">information sur l'etudiant</div>
                <div className="flex">
                  <div className="mr-4">
                    <div>nom</div>
                    <div>prenom</div>
                    <div>tel</div>
                    <div>gmail</div>
                    <div>adresse</div>
                  </div>
                  <div className="text-blue-500">
                    <div>raid</div>
                    <div>benlala</div>
                    <div>r_benlala@estin.dz</div>
                    <div>estif algeria</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offre;
