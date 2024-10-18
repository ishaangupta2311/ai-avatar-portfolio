// import { useState } from "react";

// export const useAITeacher = () => {
//   const [loading, setLoading] = useState(false);
//   const [answer, setAnswer] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);

//   const askAI = async (question) => {
//     if (loading) {
//       console.log("Request already in progress, skipping");
//       return;
//     }

//     setLoading(true);
//     console.log("Sending request to /api/gemini");
//     try {
//       const response = await fetch("/api/gemini", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ question }),
//       });

//       console.log("Response status:", response.status);

//       if (!response.ok) {
//         throw new Error(`Failed to fetch answer: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Received data:", data);
//       setAnswer(data.answer);
//       setChatHistory((prev) => [
//         ...prev,
//         { role: "user", text: question },
//         { role: "ai", text: data.answer },
//       ]);
//     } catch (error) {
//       console.error("Error asking AI:", error);
//       setAnswer("Sorry, I encountered an error while processing your request.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetChat = () => {
//     setChatHistory([]);
//     // askAI("Hello");
//   };

//   return { loading, answer, askAI, chatHistory, resetChat };
// };
