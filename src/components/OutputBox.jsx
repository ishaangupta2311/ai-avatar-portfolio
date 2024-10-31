

import { useAIAvatar } from "@/hooks/useAIAvatar";
import { useEffect, useRef } from "react";


export const OutputBox = ({ response }) => {
  const messages = useAIAvatar((state) => state.messages);
  const playMessage = useAIAvatar((state) => state.playMessage);
  const { currentMessage } = useAIAvatar();
  const environment = useAIAvatar((state) => state.environment);

  const container = useRef();

  useEffect(() => {
    container.current.scrollTo({
      top: container.current.scrollHeight,
      behaviour: "smooth",
    });
  }, [messages.length]);

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
