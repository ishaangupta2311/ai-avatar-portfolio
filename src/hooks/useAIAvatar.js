const {create} =require("zustand");

export const speakers = ["Aarav", "Kavya"];

export const useAIAvatar = create((set, get) => ({
  messages: [],
  currentMessage: null,
  speaker: speakers[0],
  setSpeaker: (speaker) => {
    set({
      speaker,
    });
  },
  environment: "default",
  setEnvironment: (environment) => {
    set(() => ({
      environment,
    }));
  },
  loading: false,
  speech:"formal",
  setSpeech: (speech) => {
    set(() => ({
      speech,
    }));
  },
  askAI: async (question) => {
    if (!question) {
      return;
    }
    const message = {
      question,
      id: get().messages.length,
    };
    set(() => ({
      loading: true,
    }));

    const speech = get().speech;

    //Ask AI
    const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: question }),
      })
    const data = await res.json();
    message.answer = data;
    message.speech = speech;

    set(() => ({
      currentMessage: message,
    }));

    set((state) => ({
      messages: [...state.messages, message],
      loading: false,
    }));
    get().playMessage(message);
  },
  playMessage: async (message) => {
    set(() => ({
      currentMessage: message,
    }));

    if (!message.audioPlayer){
      set(() => ({
        loading: true,
      }));
      //Get TTS
      const audioRes = await fetch(
        `api/tts?speaker=${get().speaker}&text=${get().message.answer}`
      );
      const audio = await audioRes.blob();
      const visemes = JSON.parse(await audioRes.headers.get("visemes"));
      const audioUrl = URL.createObjectURL(audio);
      const audioPlayer = new Audio(audioUrl);

      message.visemes = visemes;
      message.audioPlayer = audioPlayer;
      message.audioPlayer.onended = () => {
        set(() => ({
          currentMessage:null,
        }));
      };
      set(() => ({
        loading:false,
        messages: get().messages.map((m)=>{
          if(m.id == message.id){
            return message;
          }
          return m;
        }),
      }));
    }
    message.audioPlayer.currentTime=0;
    message.audioPlayer.play();

  },
  stopMessage: (message) => {
    message.audioPlayer.pause();
    set(() => ({
      currentMessage: null,
    }));
  },
}));






















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
