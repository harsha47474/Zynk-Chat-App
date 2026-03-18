import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from 'react-router-dom'
import AuthShowcase from '../components/AuthShowcase';
import toast from 'react-hot-toast'

const SingupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  }


  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-100">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">
        {/* gradient blobs */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-14 -right-10 w-44 h-44 bg-secondary/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 -left-8 w-40 h-40 bg-primary/15 blur-3xl rounded-full" />
        </div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* LOGO */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-base-300 bg-base-200/60 px-3 py-1 text-xs text-base-content/70 mb-4">
              <span className="size-2 rounded-full bg-primary" />
              <span>Join the Zynk community</span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Create account</h1>
                <p className="text-sm text-base-content/60">
                  Sign up to start chatting and stay close to your people.
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-base-200/60 border border-base-300 rounded-2xl p-5 shadow-sm">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />

                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

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
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl gap-2"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side */}

      <AuthShowcase
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        accent="secondary"
      />
    </div>


  )
}

export default SingupPage