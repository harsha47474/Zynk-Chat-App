import React from 'react'
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";


const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="fixed w-full top-0 z-40 border-b border-base-300/60 bg-base-100/70 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 transition-all hover:opacity-90">
              <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/10 shadow-sm">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div className="leading-tight">
                <h1 className="text-lg font-bold tracking-tight">Zynk</h1>
                <p className="hidden sm:block text-xs text-base-content/50 -mt-0.5">Chat that feels instant</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 rounded-xl bg-base-200/70 border-base-300 hover:bg-base-200"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2 rounded-xl bg-base-200/70 border-base-300 hover:bg-base-200">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="btn btn-sm rounded-xl btn-ghost gap-2" onClick={logout}>
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar