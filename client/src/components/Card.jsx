import React from "react";
import { Link } from "react-router-dom";
import cardPic from "../assets/cardPic.png";

function Card() {
  return (
    <div className="md:flex sm:ml-4">
      <Link to='/profile'><img src={cardPic} className=" pr-3 md:w-full md:h-full sm:h-[40%]  sm:w-[90%] sm:ml-2" alt="annonce " /></Link>

      <div className="  w-full  ">
        <div className="flex justify-between">
          <div className="font-bold  mt-2">
            Les cours de soutien scolaires chez aziz
          </div>
          <div id="date_posted de l'annonce" className="text-gray-500">12-12-2023</div>
        </div>
        <div className="font-thin">
          Recherchez-vous un soutien scolaire efficace pour votre enfant? Nous proposons des cours particuliers adaptés à ses besoins et à son niveau,
          menés par des enseignants qualifiés.
          Contactez-nous pour plus d'informations sur nos services de soutien scolaire.
        </div>
        <hr className="my-2" />
        <div className="font-bold">Informations sur l’annonce</div>
        <div className="flex">
          <div className="mr-4">
            <div>catégorie</div>
            <div>modalité</div>
            <div>tarif</div>
            <div>module</div>
            <div>Adresse</div>
          </div>
          <div className="text-blue-500">
            <div>lycée</div>
            <div>hors ligne</div>
            <div>1500dz/mois</div>
            <div>math</div>
            <div>5 Avenue des Frères Bencheikh/Bab Ezzouar/Alger</div>
          </div>
        </div>
        <button className="border p-1 border-blue-500 rounded-lg text-blue-500">
          voir l'adresse sur map
        </button>
        <hr className="my-2" />
        <div className="font-bold">Informations sur l’annonceur</div>
        <div className="flex">
          <div className="mr-4">
            <div>nom : <span className="text-blue-500">Boumansour</span></div>
            <div>prénom : <span className="text-blue-500">Ouarda </span></div>
            <div>Numéro de téléphone <span className="text-blue-500" >01255555</span></div>
            <div>email : <span className="text-blue-500" >ouarda@estin.dz</span></div>
            <div>adresse : <span className="text-blue-500">Bejaia</span></div>
            <button className="border p-1 border-blue-500 text-blue-500 rounded-lg w-full mr-1 mt-2 ">
              Ajouter aux favoris
            </button>
          </div>
          <div className=" ml-16 w-full mt-[-15px]">
            <input type="text" placeholder="écrire un commantaire" className="border-2 w-[90%] mt-2 py-5 rounded-lg p-4 mx-3 h-[80%]" />
            <button className="  border p-1 bg-blue-500 text-white rounded-lg w-[90%] mr-1 mt-2 ml-2">
              demander une offre
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Card;
