import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import profilePic from "../assets/profilePic.png";
import Nav from "../components/Nav";

function Offre() {
  return (
    <div className="p-4 mx-10  sm:mx-1  md:text-sm sm:text-xs ">
      <Nav />
      <div className="flex ">
        <LeftSideBar />
        <div className="w-[90%]   ">
          <div className=" md:p-2 md:w-[90%] sm:w-[99%] sm:ml-1 p-2 rounded-lg ">
            <div className="flex hover:bg-[var(--primary-color)] cursor-pointer rounded-lg ">
              <img src={profilePic} alt="" className="w-8 h-8 mt-2 ml-1" />
              <div className="ml-2 mr-1 ">
                <h1> Ouarda a demandé une offre </h1>
                <p className="text-gray-500 text-thin">il y'a 12 heures</p>
              </div>
              <a className="md:ml-[50%] sm:mr-1"
                data-bs-toggle="collapse"
                href="#collapseExamplee"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample3"
              >
                <h1>cliquer pour voir plus de details</h1>
              </a>
            </div>
          </div>
          <div class="collapse" id="collapseExamplee">
            <div className="md:flex md:justify-around w-[80%]  ">
              <div className="bg-[var(--primary-color)]  p-3 rounded-lg sm:ml-10 md:mr-1 sm:w-full sm:mb-1 ">
                <div className="font-bold mb-3 ">Informations sur l'annonce</div>
                <div>Categorie <span className="text-blue-500">   collège</span></div>
                <div>Tarif <span className="text-blue-500">    500dz /mois</span></div>
                <div>Thème <span className="text-blue-500">   phisik</span></div>
                <div>Modalité <span className="text-blue-500">   en ligne</span></div>
                <div>Wilaya <span className="text-blue-500">    Alger</span></div>
              </div>
              <div className="bg-[var(--primary-color)] p-3 rounded-lg sm:ml-10 md:mr-1 sm:w-full sm:mb-1  ">
                <div className="font-bold mb-3">Informations sur l'annonceur</div>
                <div>Nom <span className="text-blue-500">obumansour</span></div>
                <div>Prénom <span className="text-blue-500">ouarda</span></div>
                <div>Téléphone <span className="text-blue-500">054442</span></div>
                <div>Email <span className="text-blue-500">ouarda@estin.dz</span></div>
              </div>
              <div className="bg-[var(--primary-color)] p-3 rounded-lg sm:ml-10 md:mr-1 sm:w-full sm:mb-1 ">
                <h1 className="font-bold">commantaire</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, voluptatum.</p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Offre;
