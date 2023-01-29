import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import LeftSideBar from "../components/LeftSideBar";
import Nav from "../components/Nav";
import axios from "../api/Axios";
import ENDPOINTS from "../api/endPoints";

function Home() {
  const [annonces, setAnnonces] = useState([]);
  const fetchAnnonces = async () => {
    try {
      const response = await axios.get(ENDPOINTS.ANNONCES);
      setAnnonces(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAnnonces();
  }, []);

  console.log(annonces);
  return (
    <div className="p-4 mx-10 sm:mx-1  md:text-sm sm:text-xs  sm:ml-2 ">
      <Nav />
      <div className="flex justify-between ">
        <LeftSideBar />
        {/* todo :   create cards component wich contain list of card(annonce)  */}
        {annonces ? (
          <Card annonces={annonces} />
        ) : (
          <h2>There is no annonces to display</h2>
        )}
      </div>
    </div>
  );
}

export default Home;
