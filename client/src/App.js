import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddAnnonce from "./pages/AddAnnonce";
import React, { useContext } from "react";
import Offre from "./pages/Offre";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MesAnnonces from "./pages/MesAnnonces";
// import Map from "./pages/Map";
import { Context } from "./context/Context";
import LoginSuccess from "./pages/LoginSuccess";
import Map from "./pages/Map";
import { Navigate } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  const { user } = useContext(Context);
  console.log(user);

  const requireAuth = (Element) => {
    if (user) {
      return <Element />;
    } else {
      return <Navigate to="/" />;
    }
  };

  const NotRequireAuth = (Element) => {
    if (user) {
      return <Navigate to="/home" />;
    } else {
      return <Element />;
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={NotRequireAuth(Landing)} />
          <Route path="/offre" exact element={requireAuth(Offre)} />
          <Route path="/addannounce" exact element={requireAuth(AddAnnonce)} />
          <Route path="/home" exact element={requireAuth(Home)} />
          <Route path="/mesfavorites" element={requireAuth(Favorites)} />
          <Route path="/mesannonces" element={requireAuth(MesAnnonces)} />
          <Route path="/success" element={NotRequireAuth(LoginSuccess)} />
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
