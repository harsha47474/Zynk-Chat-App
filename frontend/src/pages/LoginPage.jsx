import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from 'react-router-dom'
import AuthShowcase from '../components/AuthShowcase';
import toast from 'react-hot-toast'


const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData);
  }


  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-100">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">
        {/* Glassmorphism background blob */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
          <div className="absolute bottom-10 -right-6 w-40 h-40 bg-secondary/20 blur-3xl rounded-full" />
        </div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Logo / Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-base-300 bg-base-200/60 px-3 py-1 text-xs text-base-content/70 mb-4">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span>Welcome back to Zynk</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
                <p className="text-sm text-base-content/60">
                  Continue your conversations in just a few seconds.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-base-200/60 border border-base-300 rounded-2xl p-5 shadow-sm">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-base-content/60">
              <span>Tip: Use a strong password to keep your chats safe.</span>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl gap-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Showcase */}
      <AuthShowcase
        title="Welcome back!"
        subtitle="Pick up right where you left off. Your chats, communities, and memories are waiting."
        accent="primary"
      />
    </div>
  );
}

export default LoginPage