
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddAnnonce from "./pages/AddAnnonce";
import Offre from "./pages/Offre";
import Landing from "./pages/Landing";
import Home from "./pages/Home";


function App() {
  return (
    <div className="App">
            <Router>
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/offre" exact element={<Offre />} />
          <Route path="/addannounce" exact element={<AddAnnonce />} />
          <Route path="/home" exact element={<Home />} />
         

      
        </Routes>
      </Router>

    </div>
  );
}

export default App;
