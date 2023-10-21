/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-spaces */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import Bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./styles/App.css";

// Components
import Home from "./components/Home";
import AddItem from "./components/AddItem";
import UpdateItem from "./components/UpdateItem";

function App() {
  return (
    <div className="container-fluid">
      <div className="container text-center">
        <h1>Welcome To The Black Parade</h1>
        <p>
          When i was a young boy, my father took me into the city, to see a
          marching band...
        </p>
        <hr />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/updateitem/:id" element={<UpdateItem />} />
        </Routes>
      </Router>
      {/* <Home></Home> */}
    </div>
  );
}

export default App;
