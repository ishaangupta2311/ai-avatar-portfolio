import { useAIAvatar } from "@/hooks/useAIAvatar";

export const OutputBox = ({ response }) => {
  const messages = useAIAvatar((state) => state.messages);
  const { currentMessage } = useAIAvatar();

  const handleScroll = (e) => {
    e.stopPropagation();
  };

  const handleWheel = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="z-[5] max-w-[600px] w-full bg-slate-800/80 p-6 backdrop-blur-md rounded-xl border border-slate-700 shadow-lg"
      style={{
        pointerEvents: "auto",
        touchAction: "auto",
      }}
      onScroll={handleScroll}
      onWheel={handleWheel}
    >
      <div
        className="flex flex-col space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar"
        style={{
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#94a3b8 rgba(51, 65, 85, 0.3)",
          cursor: "auto",
        }}
        onScroll={handleScroll}
        onWheel={handleWheel}
      >
        <style>
          {`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
              background-color: transparent;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #94a3b8;
              border-radius: 4px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
              background-color: rgba(51, 65, 85, 0.3);
              border-radius: 4px;
            }

            .custom-scrollbar {
              pointer-events: auto !important;
              user-select: text !important;
            }
          `}
        </style>
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`space-y-4 transition-opacity duration-300 ${
                currentMessage?.id === message.id ? "opacity-100" : "opacity-80"
              }`}
            >
              <div className="text-slate-400 bg-slate-700/50 p-3 rounded-lg">
                <p>{message.question}</p>
              </div>
              <div className="text-slate-100 font-medium leading-relaxed bg-slate-700/30 p-3 rounded-lg">
                <p>{message.answer}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-slate-400 italic text-center">
            Text Output goes here...
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputBox;
