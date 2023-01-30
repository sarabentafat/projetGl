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

  return (
    <div className="p-4 mx-10 sm:mx-1  md:text-sm  ">
      <Nav />
      <div className="flex justify-between ">
        <LeftSideBar />
        <div>
          {/* todo :   create cards component wich contain list of card(annonce)  */}
          {myFavorites ? (
            <Card annonces={myFavorites} />
          ) : (
            <h2>Il n'y a pas d'annonces à afficher</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
