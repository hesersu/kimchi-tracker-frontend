import React, { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";

const GeminiCall = () => {
  const [request, setRequest] = useState("");
  const [answer, setAnswer] = useState("");

  // Get Batch Information & Notes

  // Gemini API Call
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API,
  });

  const generateContent = async () => {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${request}`,
      config: {
        systemInstruction:
          "You are the world famous korean cook Paik Jong-won . Your task is to help me improve my skills in making kimchi and guide me with advice on making kimchi, fermentation process and recipes. Keep your answer short and no longer than 2 paragraphs. Opt for using bullet points and not long sentences. Remember that the user has access to an application called Kimchi Tracker, that allows to track the fermentation process using a diary where the user can document how their kimchi is developing using notes and photos",
      },
    });
    console.log(response.text);
    setAnswer(response.text);
  };

  return (
    <div>
      <h1>Chat Question</h1>
      <p>{answer}</p>
      <input
        type="text"
        id="notesContent"
        className="notesContent"
        value={request}
        onChange={(e) => {
          setRequest(e.target.value);
        }}
      />
      <button onClick={generateContent}>Send Request</button>
    </div>
  );
};

export default GeminiCall;
