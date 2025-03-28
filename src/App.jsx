import "./variables.css";
import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { SelectRecipePage } from "./pages/SelectRecipePage";
import DetailsPage from "./pages/DetailsPage";
import { InstructionPage } from "./pages/InstructionPage";
import { CreateRecipePage } from "./pages/CreateRecipePage";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import GeminiCall from "./pages/GeminiCall";
import { GeminiAdvisor } from "./components/GeminiAdvisor";
import { Footer } from "./components/Footer";
import { Toast } from "./components/Toast";

function App() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  return (
    <>
      {toast &&
      <Toast message={toast.message} type={toast.type} toastOnClose={() => setToast(null)} />}
      <GeminiAdvisor/>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage showToast={showToast}/>} />
        <Route path="/select-recipe" element={<SelectRecipePage />} />
        <Route path="/instructions/:id" element={<InstructionPage />} />
        <Route path="/create-recipe/:id" element={<CreateRecipePage showToast={showToast}/>} />
        <Route path="/details/:batchId" element={<DetailsPage showToast={showToast}/>} />
        <Route path="/gemini-call" element={<GeminiCall />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
