import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StreamList from "./components/StreamList";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<h2>Movies Page - Coming Soon</h2>} />
        <Route path="/cart" element={<h2>Cart Page - Coming Soon</h2>} />
        <Route path="/about" element={<h2>About Page - Coming Soon</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
