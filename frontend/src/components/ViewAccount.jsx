import { useChatStore } from "../store/useChatStore";
import { Mail, User } from "lucide-react";

const ViewAccount = () => {
  const { setIsAccountOpen, selectedUser } = useChatStore();

  const handleClickOutside = (e) => {
    if (e.target.id === "account-backdrop") {
      setIsAccountOpen(false);
    }
  };

  return (
    <div
      id="account-backdrop"
      className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div className="bg-base-100 p-6 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center mb-5">
            <h1 className="text-2xl font-semibold ">Account</h1>
            {/* <p className="mt-2">Your profile information</p> */}
          </div>

          <div className="flex flex-col items-center mb-3 gap-4">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-42 rounded-full object-cover border-4 "
              />
          </div>
          <div className="space-y-6 mb-5">
            <div className="space-y-1.5 mb-3">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border cursor-not-allowed">{selectedUser?.fullname}</p>
            </div>

            <div className="space-y-1.5 mb-3">
              <div className="text-sm text-zinc-400 flex items-center  gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg cursor-not-allowed border">{selectedUser?.email}</p>
            </div>
            <div className="space-y-1.5 mb-3">
              <div className="text-sm text-zinc-400 flex items-center  gap-2">
                <Mail className="w-4 h-4" />
                About
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg cursor-not-allowed border">{selectedUser?.about}</p>
            </div>
          </div>

          <div className="mt-2 bg-base-300 rounded-xl">
            {/* <h2 className="text-lg font-medium  mb-4">Account Information</h2> */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-t border-zinc-700">
                <span>Member Since</span>
                <span>{selectedUser?.createdAt?.split("T")[0]}</span>
              </div>
              {/* <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ViewAccount;
