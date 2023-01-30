import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import LeftSideBar from "../components/LeftSideBar";
import Nav from "../components/Nav";
import axios from "../api/Axios";
import ENDPOINTS from "../api/endPoints";

function Favorites() {
  const [myFavorites, setMyFavorites] = useState([]);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await axios.get(ENDPOINTS.FAVORITES);
        setMyFavorites(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAnnonces();
  }, []);
  console.log(myFavorites, "hhh");
  return (
    <div className="p-4 mx-10 sm:mx-1  md:text-sm  ">
      <Nav />
      <div className="flex justify-between ">
        <LeftSideBar />
        <div>
          {/* todo :   create cards component wich contain list of card(annonce)  */}
          {myFavorites !== [] ? (
            <div className="flex flex-col space-y-10">
              {myFavorites.map((annonce) => (
                <Card
                  key={annonce.annonce_favorites.annonce_id}
                  annonce={annonce.annonce_favorites}
                  inFav={true}
                  favId={annonce.idFav}
                />
              ))}
            </div>
          ) : (
            <h1 className="">Il n'y a pas d'annonces à afficher</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
