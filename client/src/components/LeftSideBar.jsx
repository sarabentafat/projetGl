import React from "react";
import home from "../assets/home.png";
import file from "../assets/file.png";
import love from "../assets/love.png";
import notif from "../assets/notif.png";
import exit from "../assets/exit.png";
import addFile from "../assets/addFile.png";
import selectionner from "../assets/select.png";
import "tw-elements";
import { Link } from "react-router-dom";


function LeftSideBar() {
  return (
    <div>
      <div className="md:w-[20%]  md:text-sm sm:text-xs sm:hidden md:block  ">
        <div className="flex sm:w-[200px] ">
          <img src={home} alt="mes favorites" className="p-1 mr-1" />
          <button>
            <Link to="/home"> Home</Link>
          </button>
        </div>
        <p class="">
          <a
            class="inline-block    focus:outline-none focus:ring-0  transition duration-150 ease-in-out"
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <div className="flex">
              <div className="flex">
                <img src={selectionner} alt="" className="p-1 mr-1" />
                <h1>selectionner</h1>
              </div>
            </div>
          </a>
        </p>

        <div class="collapse" id="collapseExample">
              <div class=" p-1">
                <input type="text" placeholder="module" className="border-b-2 py-1 " />        
                <input type="text" placeholder="commune" className="border-b-2 py-1 " />
                <input type="text" placeholder="wilaya" className="border-b-2 py-1 text-gray-700"  />
                <div className="flex   mb-3  border-b-2 border-gray-400   sm:w-[177px] my-1  ">
                  <div className="text-gray-700 mr-2">depuis </div>
                  <input type="date" className="" />
                </div>
                <div className="flex   mb-3  border-b-2 border-gray-400   sm:w-[177px] ">
                  <div className="text-gray-700 mr-2">jusqu'a </div>
                  <input type="date" className="" />
                </div>
              </div>
        </div>

        <div className="flex sm:w-[200px] ">
          <img
            src={file}
            alt="mes annonces"
            className="p-1 mr-1 sm:w-6 sm:h-6"
          />
          <button>
            <Link to="/mesannonces"> mes annonces</Link>
          </button>
        </div>
        <div className="flex sm:w-[200px] ">
          <img src={love} alt="mes favorites" className="p-1 mr-1" />
          <button>
            <Link to="/mesfavorites"> mes favorites</Link>
          </button>
        </div>

        <div className="flex">
          <img src={notif} alt="les offres" className="p-1 mr-1" />
          <button>
            <Link to="/offre"> offres</Link>
          </button>
        </div>
        <div className="sm:flex bg-blue-500 mt-2 text-white rounded-lg sm:block md:hidden sm:w-[100px] ">
          <img src={addFile} alt="create a new announce " className="p-2" />
          <h1 className="sm:text-xs sm:px-1 ">
            <Link to="/addannounce">créer une annonce </Link>
          </h1>
        </div>
        <div className=" flex bottom-12 absolute ">
          <img src={exit} alt="se deconnecter" className="p-1 mr-1" />

          <button className="sm:text-xs">
            <Link to="/">se deconnecter</Link>
          </button>
        </div>
        {/* <Route path='/offre' component={Offre}></Route> */}
      </div>
      {/* mobile responsive */}
      <div className="sm:block md:hidden sm:w-[20px]  ">
        <Link to="/home">
          <img src={home} className="my-3 w-5" alt="" />
        </Link>
        <Link to="/mesannonces">
          <img src={file} className="my-3  w-5" alt="" />
        </Link>
        <Link to="/mesfavorites">
          <img src={love} className="my-3  w-5" alt="" />
        </Link>
        <Link to="/offre">
          {" "}
          <img src={notif} className="my-3  w-5" alt="" />
        </Link>
        <Link to="/addannounce">
          <img
            src={addFile}
            className="my-3 bg-blue-400 p-1 rounded-lg w-6 "
            alt=""
          />
        </Link>
        <Link to="/">
          <img
            src={exit}
            className="my-2 flex bottom-12 absolute  w-5"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
}

export default LeftSideBar;
