const PREVIEW_MESSAGES = [
  { id: 1, content: "No matter how far you are, you’re always close to my heart.", isSent: false },
  { id: 2, content: "Just hearing from you makes my day better.", isSent: true },
];

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 pt-28">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-1 gap-3 mb-8">
            <img
              src={"/image1.png"}
              alt={"Feature1"}
              className="h-[200px] w-[430px] rounded-2xl "
            />
            <div className="max-w-[430px]">
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      A
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-sm">Alex</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
              </div>
          <div className="p-4 space-y-4 min-w-[400px]max-w-[400px] max-h-[250px] overflow-y-auto bg-base-100 rounded-2xl">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm text-left">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5 
                            ${message.isSent ? "text-primary-content/70 text-right" : "text-base-content/70 text-left"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
                </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Real Talk. Real Time.</h2>
        
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;