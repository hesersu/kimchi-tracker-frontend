// import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { SelectRecipePage } from "./pages/SelectRecipePage";
import DetailsPage from "./pages/DetailsPage";
import { InstructionPage } from "./pages/InstructionPage";
import { CreateRecipePage } from "./pages/CreateRecipePage";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import GeminiCall from "./pages/GeminiCall";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select-recipe" element={<SelectRecipePage />} />
        <Route path="/instructions/:id" element={<InstructionPage />} />
        <Route path="/create-recipe/:id" element={<CreateRecipePage />} />
        <Route path="/details/:batchId" element={<DetailsPage />} />
        <Route path="/gemini-call" element={<GeminiCall />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
