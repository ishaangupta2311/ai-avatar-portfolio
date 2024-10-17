import { useState } from "react";

export const TypingBox = ({ onResponseChange }) => {
  const handleGenerate = async () => {
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        onResponseChange(data.model_response);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [prompt, setPrompt] = useState("");
  const [modelResponse, setModelResponse] = useState();

  const [loading, setLoading] = useState(false);
  

  return (
    <div className="z-10 max-w-[600px] flex space-y-6 flex-col bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600-400/30 p-4 backdrop-blur-md rounded-xl border-slate-100/30 border">
      <div>
        <h2 className="text-white font-bold text-xl">Hi, I&apos;m Ishaan!</h2>
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
            id="chatInput"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleGenerate();
              }
            }}
          />
          <button className="bg-slate-100/20 p-2 px-6 rounded-full text-white" onClick={handleGenerate} >
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
