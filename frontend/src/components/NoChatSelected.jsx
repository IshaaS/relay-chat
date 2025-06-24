import { MessageCircleHeart } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-4">
        {/* Icon Display */}
        <div className="flex justify-center gap- mb-4">
          <div className="relative">
            <div
              className=" rounded-2xl  flex items-center
             justify-center animate-bounce"
            >
              <h2 className="text-2xl font-bold">Relay</h2>
              <MessageCircleHeart className="w-8 h-8  text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        {/* <h2 className="text-2xl font-bold">Select a conversation to start chatting</h2> */}
          <p className="text-base-content/60">
            Select a conversation to chat......
          </p>
      </div>
    </div>
  );
};

export default NoChatSelected;