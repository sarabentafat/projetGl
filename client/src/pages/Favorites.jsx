import React from "react";
import Card from "../components/Card";
import LeftSideBar from "../components/LeftSideBar";
import Nav from "../components/Nav";

function Favorites() {
  return (
    <div className="p-4 mx-10 sm:mx-1  md:text-sm  ">
      <Nav />
      <div className="flex justify-between ">
        <LeftSideBar />
        <div>
          <Card />
        </div>
      </div>
    </div>
  );
}

export default Favorites;
