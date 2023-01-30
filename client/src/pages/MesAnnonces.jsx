import React, { useState, useEffect } from "react";
import MyCard from "../components/MyCard";
import LeftSideBar from "../components/LeftSideBar";
import Nav from "../components/Nav";
import axios from "../api/Axios";
import ENDPOINTS from "../api/endPoints";

function MesAnnonces() {
  const [myAnnonces, setMyAnnonces] = useState([]);
  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await axios.get(ENDPOINTS.MYANNONCES);
        setMyAnnonces(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAnnonces();
  }, []);
  return (
    <div className="p-4 mx-10 sm:mx-1  md:text-sm sm:text-xs  sm:ml-2 ">
      <Nav />
      <div className="flex justify-between ">
        <LeftSideBar />
        {myAnnonces ? (
          <div className="flex flex-col space-y-10">
            {myAnnonces.map((annonce) => (
              <MyCard key={annonce.annonce_id} annonce={annonce} />
            ))}
          </div>
        ) : (
          <h2>Il n'y a pas d'annonces à afficher.</h2>
        )}
      </div>
    </div>
  );
}

export default MesAnnonces;
