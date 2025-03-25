// import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { SelectRecipePage } from "./pages/SelectRecipePage";
import DetailsPage from "./pages/DetailsPage";
import { InstructionPage } from "./pages/InstructionPage";
import { CreateRecipePage } from "./pages/CreateRecipePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select-recipe" element={<SelectRecipePage />} />
        <Route path="/instructions/:id" element={<InstructionPage />}/>
        <Route path="/create-recipe/:id" element={<CreateRecipePage/>}/>
        <Route path="/details/:batchId" element={<DetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
