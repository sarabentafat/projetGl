import React from "react";
import cardPic from "../assets/cardPic.png";

function Card() {
  return (
    <div className="md:flex  sm:ml-5  sm:text-xs sm:mr-[250px]  ">
      <img src={cardPic} className="sm:w-[250px] w-full" alt="" />
      <div className=" sm:w-[240px] w-full ">
        <div className="flex justify-between">
          <div className="font-bold hover:border-b ">
            Les cours de soutien shez Aziz
          </div>
          <div className="text-gray-500">12-12-2023</div>
        </div>
        <div className="font-thin">
          description descriptiondes criptiondes crip tiondescri ptiondesc
          ription descr iptionde ript icriptiondes crip tiondescri
        </div>
        <hr className="my-2" />
        <p class="">
          <a
            class="inline-block focus:outline-none focus:ring-0  transition duration-150 ease-in-out"
            data-bs-toggle="collapse"
            href="#collapseExample2"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <div className="font-bold"> = details</div>
          </a>
        </p>

        <div class="collapse" id="collapseExample2">
          <div class=" ">
            <div className="font-bold">Information sur l’annonce</div>
            <div className="flex">
              <div className="mr-4">
                <div>categorie</div>
                <div>tarif</div>
                <div>module</div>
                <div>lieu</div>
              </div>
              <div className="text-blue-500">
                <div>lycee</div>
                <div>1500dz/mois</div>
                <div>math</div>
                <div>lieu</div>
              </div>
            </div>
            <button className="border p-1 border-blue-500 rounded-lg text-blue-500">
              voir sur map
            </button>
            <hr className="my-2" />
            <div className="font-bold">Information sur l’annonceur</div>
            <div className="flex">
              <div className="mr-4">
                <div>nom</div>
                <div>prenom</div>
                <div>tel</div>
                <div>gmail</div>
                <div>adresse</div>
              </div>
              <div className="text-blue-500">
                <div>aawkell</div>
                <div>brahim</div>
                <div>05888888</div>
                <div>eleulma/setif/algeria</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-2">
          <button className="border p-1 border-blue-500 text-blue-500 rounded-lg w-[50%] mr-1">
            sauvegarder
          </button>
          <button className=" p-1 border-blue-500 text-white bg-blue-500 rounded-lg w-[50%]">
            demander un offre
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
