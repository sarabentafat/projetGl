import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddAnnonce from "./pages/AddAnnonce";
import React, { useContext } from "react";
import Offre from "./pages/Offre";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MesAnnonces from "./pages/MesAnnonces";
import { Context } from "./context/Context";
import LoginSuccess from "./pages/LoginSuccess";
// import Map from "./pages/Map";

function App() {
  const { user } = useContext(Context);
  console.log(user);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={user ? <Home /> : <Landing />} />
          <Route path="/offre" exact element={user ? <Offre /> : <Landing />} />
          <Route
            path="/addannounce"
            exact
            element={user ? <AddAnnonce /> : <Landing />}
          />
          <Route path="/home" exact element={user ? <Home /> : <Landing />} />
          <Route
            path="/mesfavorites"
            element={user ? <Favorites /> : <Landing />}
          />
          <Route
            path="/mesannonces"
            element={user ? <MesAnnonces /> : <Landing />}
          />
          <Route path="/success" element={user ? <Home /> : <LoginSuccess />} />
        </Routes>
      </Router>
      {/* <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=YOUR_API_KEY`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      /> */}
    </div>
  );
}

export default App;
