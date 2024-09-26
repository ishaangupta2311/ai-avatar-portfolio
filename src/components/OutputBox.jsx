// import { TypingBox } from "./TypingBox"
// import { GoogleGenerativeAI } from "@google/generative-ai";



export const OutputBox = ({ response }) => {
  return (
    <div className="z-10 max-w-[600px] flex flex-col space-y-6 bg-slate-800/80 p-6 backdrop-blur-md rounded-xl border border-slate-700 shadow-lg">
      {response ? (
        <div className="text-slate-100 font-medium leading-relaxed">
          <p>{response}</p>
        </div>
      ) : (
        <div className="text-slate-400 italic">Text output will appear here...</div>
      )}
    </div>
  );
}
