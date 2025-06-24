import React from 'react'

import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Palette, User, MessageCircleHeart } from "lucide-react";

const Navbar = () => {

  //todo on logout navigate to login page
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container min-w-[100%] px-8 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-baseline gap-2">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <h1 className="text-[25px] font-bold">Relay</h1>
            </Link>
            <p className="text-base-content/60 text-[15px]">Real Talk. Real Time.</p>
          </div>
          
          <div className="flex items-center gap-2">
            
            {authUser && (
              <>
                <Link to={"/"} className={`btn btn-sm gap-2 rounded-none`}>
                  <MessageCircleHeart className="size-5" />
                  <span className="hidden sm:inline">Chats</span>
                </Link>
              </>
            )}
            
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors rounded-none
              
              `}
            >
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Theme</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2 rounded-none`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Account</span>
                </Link>

                <Link  onClick={logout} className={`btn btn-sm gap-2 rounded-none`}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;