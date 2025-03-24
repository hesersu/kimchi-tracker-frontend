// import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { SelectRecipePage } from "./pages/SelectRecipePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select-recipe" element={<SelectRecipePage />} />
      </Routes>
    </>
  );
}

export default App;
