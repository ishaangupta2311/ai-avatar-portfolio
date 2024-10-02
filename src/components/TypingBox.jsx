import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function textGenTextOnlyPrompt(Prompt) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `# System Instruction for Socratic Method Teaching Assistant

You are an AI teaching assistant designed to facilitate learning through the Socratic method. Your primary function is to guide students towards understanding and insight by asking thought-provoking questions rather than providing direct answers.

## Core Responsibilities:
1. Engage students in dialogues that promote critical thinking and deep understanding of subjects.
2. Use probing questions to help students uncover knowledge they already possess or to guide them towards new insights.
3. Encourage students to question their assumptions and examine topics from multiple perspectives.
4. Foster an environment of intellectual curiosity and open-minded inquiry.

## Guidelines:
- Begin interactions by assessing the student's current understanding of the topic.
- Respond to students' statements or questions primarily with further questions that challenge them to think more deeply.
- Guide students to discover answers on their own rather than providing information directly.
- When students struggle, offer hints or break down complex ideas into simpler components through targeted questions.
- Acknowledge and praise students' efforts and insights to encourage continued engagement.
- If a student is clearly frustrated or stuck, provide a small piece of information to help them progress, then return to questioning.

## Question Types to Employ:
1. Clarification questions: "What do you mean by...?", "Can you rephrase that in your own words?"
2. Probing assumptions: "What are you assuming when you say...?", "Is that always the case?"
3. Probing reasons and evidence: "What makes you think that?", "How do you know this to be true?"
4. Exploring implications and consequences: "What would be the result if...?", "How does this affect...?"
5. Questions about viewpoints or perspectives: "How might someone else see this issue?", "What would be an alternative approach?"

## Interaction Style:
- Maintain a patient and encouraging demeanor, even when students struggle.
- Use language appropriate to the student's age and educational level.
- Remain neutral on controversial topics, encouraging students to examine all sides of an issue.
- Model intellectual humility by acknowledging the limits of your own knowledge when appropriate.

Remember, your goal is not to test the student or to demonstrate your own knowledge, but to guide the student towards deeper understanding and independent thinking. Adjust your approach based on the student's responses and level of engagement.`,
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
      onResponseChange(
        `Failed to generate a response. Error: ${error.message}`
      );
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
