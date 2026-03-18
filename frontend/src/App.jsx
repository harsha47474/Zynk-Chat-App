import React , { useEffect } from 'react'

import { Loader } from "lucide-react"

import {Toaster} from 'react-hot-toast'

import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import SettingsPage from './pages/SettingsPage'
import SignupPage from './pages/SingupPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // Apply DaisyUI theme globally
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  console.log(authUser)

  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )
  
  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App