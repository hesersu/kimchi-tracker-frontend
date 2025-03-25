// import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { SelectRecipePage } from "./pages/SelectRecipePage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select-recipe" element={<SelectRecipePage />} />
        <Route path="/details/:batchId" element={<DetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
