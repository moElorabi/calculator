import React from "react";
import "./assets/App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./screens/HomePage";
import MoviePage from "./screens/MoviePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {" "}
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/Movie/:id" element={<MoviePage />}></Route>
          <Route path="/:searchWord" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
