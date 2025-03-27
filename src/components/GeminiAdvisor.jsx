import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { GoogleGenAI } from "@google/genai";
import "../components/GeminiAdvisor.css";
import axios from "axios";
import { API_URL } from "../../config/apiConfig";
import ReactMarkdown from "react-markdown";

export const GeminiAdvisor = () => {
  const [request, setRequest] = useState("");
  const [answer, setAnswer] = useState("");

  const [batch, setBatch] = useState();

  // Get Batch Information & Notes
  let { pathname } = useLocation();

  useEffect(() => {
    console.log("Path : ", pathname);
    const batchId = pathname.substring(pathname.lastIndexOf("/") + 1);
    if (batchId) {
      console.log("Batch info : ", batchId);
      axios
        .get(`${API_URL}/batches/?id=${batchId}`)
        .then((res) => setBatch(res.data[0]))
        .catch((err) => console.log(err));
    } else {
      setBatch();
    }
  }, [pathname]);

  // Gemini API Call
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API,
  });

  const generateContent = async () => {
    let instructions =
      "You are the world famous korean cook Paik Jong-won. Your task is to help me improve my skills in making kimchi and guide me with advice on making kimchi, fermentation process and recipes. Keep your answer short and no longer than 2 paragraphs. Opt for using bullet points and not long sentences. Remember that the user has access to an application called Kimchi Tracker, that allows to track the fermentation process using a diary where the user can document how their kimchi is developing using notes and photos";
    if (batch) {
      instructions = `You are the world famous korean cook ${
        batch.chef
      }. Your task is to help me improve my skills in making kimchi and guide me with advice on making kimchi, fermentation process and recipes. Keep your answer short and no longer than 2 paragraphs. Opt for using bullet points and not long sentences. Remember that the user has access to an application called Kimchi Tracker, that allows to track the fermentation process using a diary where the user can document how their kimchi is developing using notes and photos. Use the following informations about my kimchi recipe : ${JSON.stringify(
        batch
      )}`;
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${request}`,
      config: {
        systemInstruction: instructions,
      },
    });
    console.log(instructions);
    console.log(response.text);
    setAnswer(response.text);
  };
  if (batch) {
    console.log("Batch : ", batch);
  }
  return (
    <div className="gemini-container">
      <h3 className="gemini-title">The chef tips</h3>
      <div className="gemini-response">
        <ReactMarkdown>
          {answer}
        </ReactMarkdown>
      </div>
      <textarea
        type="text"
        id="notesContent"
        name="notesContent"
        className="gemini-question"
        value={request}
        onChange={(e) => {
          setRequest(e.target.value);
        }}
        rows="5"
      ></textarea>
      <button onClick={generateContent} className="gemini-btn">
        Send Request
      </button>
      {/* <button
        onClick={() => {
          console.log("batch!!! => ", batch);
        }}
      >
        check batch
      </button> */}
    </div>
  );
};
