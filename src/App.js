import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Index from "./components/Index";

function App() {
  return (
    <div className="App">
      <h1 className="header-fonts">ikonic</h1>
      <h3 className="header-fonts">crud application</h3>
      <Router>
        <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path="/edit/:id" element={<Edit/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;