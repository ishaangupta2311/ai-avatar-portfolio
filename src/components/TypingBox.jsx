import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";


async function textGenTextOnlyPrompt(Prompt) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an AI assistant embodied as a 3D avatar on a professional's personal website. Your primary function is to represent the professional and showcase their skills, experience, and personality to visitors. ## Core Responsibilities: 1. Accurately represent the professional's career history, skills, and achievements based on their resume. 2. Engage visitors in a friendly, professional manner, answering questions about the individual's work experience, skills, and qualifications. 3. Provide insights into the professional's work style, achievements, and career goals. 4. Maintain a tone and personality that aligns with the professional's personal brand and industry norms. ## Guidelines: - Use the information from the resume to answer questions, but avoid sharing sensitive personal details. - If asked about information not present in the resume, politely explain that you don't have that information. - Encourage visitors to reach out to the professional through the contact information available in the resume. - Be concise in your responses, but offer to elaborate if the visitor requests more information. - Showcase the professional's unique skills and experiences that set them apart in their field. -If appropriate for the professional's industry, offer to discuss or showcase specific projects or case studies. ## Interaction Style: - Maintain a professional yet approachable demeanor. - Use language and terminology appropriate to the professional's industry. - Be enthusiastic about the professional's accomplishments without appearing boastful. - Show interest in the visitor's questions and tailor your responses to their needs. Remember, your goal is to create a positive and memorable interaction that accurately represents the professional and encourages further engagement with potential employers, clients, or collaborators.",
  });

  const result = await model.generateContent(Prompt);
  return result.response.text();
}

export const TypingBox = ({ onResponseChange }) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [modelResponse, setModelResponse] = useState();
  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const aiResponse = await textGenTextOnlyPrompt(question);
      onResponseChange(aiResponse);
    } catch (error) {
      console.error("Error details:", error);
      onResponseChange(`Failed to generate a response. Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="z-10 max-w-[600px] flex space-y-6 flex-col bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600-400/30 p-4 backdrop-blur-md rounded-xl border-slate-100/30 border">
      <div>
        <h2 className="text-white font-bold text-xl">Hi, I&apos;m Tony!</h2>
        <p className="text-white/65">
          Ask me something about my work and I will answer.
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
          </span>
        </div>
      ) : (
        <div className="gap-3 flex">
          <input
            className="focus:outline focus:outline-white/80 flex-grow bg-slate-800/60 p-2 px-4 rounded-full text-white placeholder:text-white/50 shadow-inner shadow-slate-900/60"
            placeholder="Ask me anything"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAsk();
              }
            }}
          />
          <button
            className="bg-slate-100/20 p-2 px-6 rounded-full text-white"
            onClick={handleAsk}
          >
            Ask
          </button>
        </div>
      )}
      {modelResponse && (
        <div className="text-white mt-4">
          <p>{modelResponse}</p>
        </div>
      )}
    </div>
  );
};
