import { useAIAvatar } from "@/hooks/useAIAvatar";
import { useEffect, useRef } from "react";

export const OutputBox = ({ response }) => {
  const messages = useAIAvatar((state) => state.messages);
  const playMessage = useAIAvatar((state) => state.playMessage);
  const { currentMessage } = useAIAvatar();
  const environment = useAIAvatar((state) => state.environment);

  const container = useRef();

  useEffect(() => {
    if (container.current) {
      container.current.scrollTo({
        top: container.current.scrollHeight,
        behavior: "smooth", // Note: fixed typo in 'behavior'
      });
    }
  }, [messages.length]);

  return (
    <div
      ref={container} // Add the ref here
      className="z-10 max-w-[600px] flex flex-col space-y-6 bg-slate-800/80 p-6 backdrop-blur-md rounded-xl border border-slate-700 shadow-lg overflow-y-auto max-h-[400px]" // Added overflow and max-height properties
    >
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id} className="space-y-4">
            <div className="text-slate-400">
              <p>{message.question}</p>
            </div>
            <div className="text-slate-100 font-medium leading-relaxed">
              <p>{message.answer}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-slate-400 italic">
          Text output will appear here...
        </div>
      )}
    </div>
  );
};
