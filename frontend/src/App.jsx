import React, { useEffect } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import {Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";

import {Loader} from "lucide-react";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const {theme} =useThemeStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  console.log({authUser});
  if(isCheckingAuth && !authUser) return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser? <HomePage />:<Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser? <SignUpPage />: <Navigate to="/" />}/>
        <Route path="/login" element={!authUser? <LoginPage />: <Navigate to="/" />}/>
        <Route path="/profile" element={authUser? <ProfilePage />:<Navigate to="/login"/>}/>
        <Route path="/settings" element={<SettingsPage />}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;