
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddAnnonce from "./pages/AddAnnonce";
import Offre from "./pages/Offre";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MesAnnonces from "./pages/MesAnnonces";
import Map from "./pages/Map"


function App() {
  return (
    <div className="App">
            <Router>
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/offre" exact element={<Offre />} />
          <Route path="/addannounce" exact element={<AddAnnonce />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/mesfavorites" element={<Favorites/>}/>
          <Route path="/mesannonces" element={<MesAnnonces/>}/>
          
         

      
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
