import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import cardPic from "../assets/cardPic.png";
import annonFunc from "../api/annonFunc";

function Card({ annonce, inFav, favId }) {
  const [comment, setComment] = useState("");
  const commentRef = useRef();

  const handleComment = async () => {
    setComment(commentRef.current.value);
    if (comment !== "") {
      annonFunc.addComment(annonce.annonce_id, comment);
      setComment("");
    }
    commentRef.current.value = "";
  };

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
          className=" pr-3 md:w-full md:h-full sm:h-[40%]  sm:w-[90%] sm:ml-2"
          alt="annonce "
        />
      </Link>

      <div className="  w-full  ">
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
              nom : <span className="text-blue-500">Boumansour</span>
            </div>
            <div>
              prénom : <span className="text-blue-500">Ouarda </span>
            </div>
            <div>
              Numéro de téléphone{" "}
              <span className="text-blue-500">01255555</span>
            </div>
            <div>
              email : <span className="text-blue-500">ouarda@estin.dz</span>
            </div>
            <div>
              adresse : <span className="text-blue-500">Bejaia</span>
            </div>
            <button className="border p-1 border-blue-500 text-blue-500 rounded-lg w-full mr-1 mt-5 ">
              Ajouter aux favoris
            </button>
          </div>
          <div className=" ml-16 w-full mt-[-30px]">
            <input
              type="text"
              placeholder="écrire un commantaire"
              className="border-2 w-[90%] mt-2 py-5 rounded-lg p-4 mx-3 h-[80%]"
            />
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
