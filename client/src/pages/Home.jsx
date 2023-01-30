import React, { useState, useEffect, useContext } from "react";
import Card from "../components/Card";
import LeftSideBar from "../components/LeftSideBar";
import Nav from "../components/Nav";
import axios from "../api/Axios";
import ENDPOINTS from "../api/endPoints";
import { Context } from "../context/Context";

function Home() {
  const { searchKey } = useContext(Context);
  const [annonces, setAnnonces] = useState([]);
  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await axios.get(ENDPOINTS.ANNONCES, {
          params: {
            mots_cles: searchKey,
          },
        });
        console.log(searchKey);
        setAnnonces(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAnnonces();
  }, [searchKey]);

  console.log(annonces);
  return (
    <div className="p-4 mx-10 sm:mx-1  md:text-sm sm:text-xs  sm:ml-2 ">
      <Nav />
      <div className="flex justify-between ">
        <LeftSideBar />
        {/* todo :   create cards component wich contain list of card(annonce)  */}
        {annonces ? (
          <div className="flex flex-col space-y-10">
            {annonces.map((annonce) => (
              <Card key={annonce.annonce_id} annonce={annonce} />
            ))}
          </div>
        ) : (
          <h2>Il n'y a pas d'annonces à afficher.</h2>
        )}
      </div>
    </div>
  );
}

export default Home;
