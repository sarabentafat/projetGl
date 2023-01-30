import React from "react";
import { Link } from "react-router-dom";
import cardPic from "../assets/cardPic.png";

function Card() {
  return (
    <div className="md:flex sm:ml-4">
      <Link to="/profile">
        <img
          src={cardPic}
          className=" pr-3 md:w-full md:h-full sm:h-[40%]  sm:w-[90%] sm:ml-2"
          alt="annonce "
        />
      </Link>

      <div className="  w-full  ">
        <div className="flex justify-between">
          <div className="font-bold  mt-2">
            Les cours de soutien scolaires chez aziz
          </div>
          <div id="date_posted de l'annonce" className="text-gray-500">
            12-12-2023
          </div>
        </div>
        <div className="font-thin">
          Recherchez-vous un soutien scolaire efficace pour votre enfant? Nous
          proposons des cours particuliers adaptés à ses besoins et à son
          niveau, menés par des enseignants qualifiés. Contactez-nous pour plus
          d'informations sur nos services de soutien scolaire.
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
            <div>nom</div>
            <div>prénom</div>
            <div>Numéro de téléphone</div>
            <div>email</div>
            <div>adresse</div>
          </div>
          <div className="text-blue-500">
            <div>aawkell</div>
            <div>brahim</div>
            <div>0581946715</div>
            <div>ouarda@estin.dz</div>
            <div>eleulma/setif/algeria</div>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <button className="border p-1 border-blue-500 text-blue-500 rounded-lg w-[50%] mr-1">
            Ajouter aux favoris
          </button>
          <button className="border p-1 bg-blue-500 text-white rounded-lg w-[50%] mr-1">
            suprimmer l'annonce
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
