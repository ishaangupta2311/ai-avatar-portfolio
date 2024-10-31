const { create } = require("zustand");

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
  speech: "formal",
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

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: question }),
      });
      const data = await res.json();
      message.answer = data.model_response;
      message.speech = speech;

      set(() => ({
        currentMessage: message,
      }));

      set((state) => ({
        messages: [...state.messages, message],
        loading: false,
      }));
      get().playMessage(message);
    } catch (error) {
      console.error("Error asking AI:", error);
      set(() => ({ loading: false }));
    }
  },
  playMessage: async (message) => {
    set(() => ({
      currentMessage: message,
    }));

    if (!message.audioPlayer) {
      set(() => ({
        loading: true,
      }));
      try {
        const audioRes = await fetch(
          `api/tts?speaker=${get().speaker}&text=${encodeURIComponent(
            message.answer
          )}`
        );
        const audio = await audioRes.blob();
        const visemes = JSON.parse(audioRes.headers.get("visemes"));
        const audioUrl = URL.createObjectURL(audio);
        const audioPlayer = new Audio(audioUrl);

        message.visemes = visemes;
        message.audioPlayer = audioPlayer;
        message.audioPlayer.onended = () => {
          set(() => ({
            currentMessage: null,
          }));
        };
        set(() => ({
          loading: false,
          messages: get().messages.map((m) => {
            if (m.id === message.id) {
              return message;
            }
            return m;
          }),
        }));
      } catch (error) {
        console.error("Error playing message:", error);
        set(() => ({ loading: false }));
      }
    }
    message.audioPlayer.currentTime = 0;
    message.audioPlayer.play();
  },
  stopMessage: (message) => {
    if (message?.audioPlayer) {
      message.audioPlayer.pause();
    }
    set(() => ({
      currentMessage: null,
    }));
  },
}));
