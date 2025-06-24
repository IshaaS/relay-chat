import React from 'react';
import { useState } from "react";
import toast from 'react-hot-toast';
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [about, setAbout] = useState(authUser?.about || "");
  const [initialAbout, setInitialAbout] = useState(authUser?.about || "");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    let imageFile = file;

  if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
    toast.error(".heic images are not supported");
    return;
  }

  const reader = new FileReader();

  reader.readAsDataURL(imageFile);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleAboutUpdate = async (e) => {
    await updateProfile({ about: about });
    setInitialAbout(about);
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center mb-5">
            <h1 className="text-2xl font-semibold ">Account</h1>
            {/* <p className="mt-2">Your profile information</p> */}
          </div>

          <div className="flex flex-col items-center mb-3 gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-42 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : 
                <label
                htmlFor="avatar-upload"
                className={`
                  hover:scale-105
                  p-2 cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                {"Edit Photo"}
                <input
                  type="file"
                  id="avatar-upload1"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
                 </label>
              }
            </p>
          </div>

          <div className="space-y-6 mb-5">
            <div className="space-y-1.5 mb-3">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border cursor-not-allowed">{authUser?.fullname}</p>
            </div>

            <div className="space-y-1.5 mb-3">
              <div className="text-sm text-zinc-400 flex items-center  gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg cursor-not-allowed border">{authUser?.email}</p>
            </div>

            <div className="space-y-1.5 mb-1">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                About
              </div>
               <input
                type="text"
                name="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us about yourself"
                className="w-full px-4 py-2.5 bg-base-200 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={handleAboutUpdate}
              disabled={about === initialAbout}
              className={`mt-2 px-4 py-2 text-sm rounded-lg transition-all
              ${about !== initialAbout 
              ? "bg-primary text-white hover:bg-primary/90 cursor-pointer" 
              : "bg-gray-500 text-white cursor-not-allowed"}
              `}
            >
              Save About
            </button>
          </div>

          <div className="mt-2 bg-base-300 rounded-xl">
            {/* <h2 className="text-lg font-medium  mb-4">Account Information</h2> */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-t border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
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
  );
};
export default ProfilePage;