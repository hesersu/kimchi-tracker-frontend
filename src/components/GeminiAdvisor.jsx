import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { GoogleGenAI } from "@google/genai";
import "../components/GeminiAdvisor.css";
import axios from "axios";
import { API_URL } from "../../config/apiConfig";
import geminiCabbage from "../assets/gemini-cabbage.png";
import closeChatButton from "../assets/xmark-solid.svg";
import ReactMarkdown from "react-markdown";

export const GeminiAdvisor = () => {
  const [request, setRequest] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [batch, setBatch] = useState();

  const [chatOpen, setChatOpen] = useState(false);

  // Handle opening and closing of chat
  const toggleChat = () => {
    setChatOpen(!chatOpen);
    setAnswer("");
    setRequest("");
  };

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
    setIsLoading(true);
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
    setIsLoading(false);
  };
  if (batch) {
    console.log("Batch : ", batch);
  }
  return (
    <>
      <button className="btn-chat-open" onClick={toggleChat}>
        <img className="btn-chat-image" src={geminiCabbage} alt="" />
        24/7 Kimchi Support
      </button>
      {chatOpen && (
        <div className="gemini-container">
          <div className="gemini-controls">
            <h3 className="gemini-title">24/7 Kimchi Support</h3>
            <button className="gemini-close-button" onClick={toggleChat}>
              <img src={closeChatButton} alt="" />
            </button>
          </div>
          <div className="gemini-response">
            {isLoading ? (
              <div className="gemini-loader-container">
                <span className="gemini-loader"></span>
              </div>
            ) : (
              <ReactMarkdown>{answer}</ReactMarkdown>
            )}
          </div>
          <textarea
            type="text"
            id="notesContent"
            name="notesContent"
            className="gemini-question"
            placeholder="Ask you question here"
            value={request}
            onChange={(e) => {
              setRequest(e.target.value);
            }}
            rows="5"
          ></textarea>
          <button onClick={generateContent} className="gemini-btn">
            Ask question
          </button>
          {/* <button
        onClick={() => {
          console.log("batch!!! => ", batch);
        }}
      >
        check batch
      </button> */}
        </div>
      )}
    </>
  );
};
