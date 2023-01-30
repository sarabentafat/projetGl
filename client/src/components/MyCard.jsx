import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import cardPic from "../assets/cardPic.png";
import annonFunc from "../api/annonFunc";

function MyCard({ annonce, inFav, favId }) {
  const formatAdresse = (adresse) => {
    if (adresse) {
      return `${adresse.wilaya} ${adresse.commune}`;
    }
  };

  return (
    <div className="md:flex sm:ml-4">
      <Link>
        <img
          src={annonce.photos.length > 0 ? annonce.photos[0].photo : cardPic}
          className=" pr-3  md:w-full md:h-full sm:h-[40%]  sm:w-[90%] sm:ml-2"
          alt="annonce "
        />
      </Link>

      <div className="  w-full">
        <div className="flex justify-between">
          <h1 className="font-bold  mt-2">{annonce.titre}</h1>
          <div id="date_posted de l'annonce" className="text-gray-500">
            {annonce.date_posted}
          </div>
        </div>
        <div className="font-thin">{annonce.description}</div>
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
            <div>{annonce.categorie}</div>
            <div>{annonce.modalite}</div>
            <div>{annonce.tarif} dz/mois</div>
            <div>{annonce.theme}</div>
            <div>{formatAdresse(annonce.adresse_annonce)}</div>
          </div>
        </div>
        <button className="border p-1 border-blue-500 rounded-lg text-blue-500">
          voir l'adresse sur map
        </button>
        <hr className="my-2" />
        <div className="font-bold">Informations sur l’annonceur</div>
        <div className="flex">
          <div className="mr-4">
            <div>
              nom :{" "}
              <span className="text-blue-500">
                {annonce.personne_annonces.nom}
              </span>
            </div>
            <div>
              prénom :{" "}
              <span className="text-blue-500">
                {annonce.personne_annonces.prenom}
              </span>
            </div>
            <div>
              Numéro de téléphone{" "}
              <span className="text-blue-500">055658985</span>
            </div>
            <div>
              email :{" "}
              <span className="text-blue-500">
                {annonce.personne_annonces.email}
              </span>
            </div>
            {!inFav ? (
              <button
                className="border p-1 border-blue-500 text-blue-500 rounded-lg w-full mr-1 mt-2 "
                onClick={() => {
                  annonFunc.addToFav(annonce.annonce_id);
                }}
              >
                Ajouter aux favoris
              </button>
            ) : (
              <button
                className="border p-1 border-blue-500 text-blue-500 rounded-lg w-full mr-1 mt-2 "
                onClick={() => {
                  annonFunc.removeFromFav(favId);
                }}
              >
                supprimer de favoris
              </button>
            )}
          </div>
        </div>
        <div className="w-full flex justify-between mt-2">
          <button
            className="border p-1 border-blue-500 text-blue-500 rounded-lg w-[50%] mr-1"
            onClick={() => annonFunc.addToFav(annonce.annonce_id)}
          >
            Ajouter aux favoris
          </button>
          <button
            className="border p-1 bg-blue-500 text-white rounded-lg w-[50%] mr-1"
            onClick={() => annonFunc.deleteAnnonce(annonce.annonce_id)}
          >
            suprimmer l'annonce
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyCard;
