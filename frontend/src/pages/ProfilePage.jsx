import React, { useMemo, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Camera, Mail, User, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const memberSince = useMemo(() => {
    const raw = authUser?.createdAt;
    if (!raw) return "-";
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return raw?.split("T")?.[0] ?? "-";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  }, [authUser?.createdAt]);

  if (!authUser) {
    return (
      <div className="h-screen pt-20 flex items-center justify-center">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-base-content/60">You’re not logged in.</p>
          <Link to="/login" className="btn btn-primary btn-sm">Go to login</Link>
        </div>
      </div>
    );
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-base-100">
      <div className="max-w-3xl mx-auto p-4 py-8">
        <div className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-200/60 shadow-sm">
          <div className="absolute inset-0 pointer-events-none opacity-60">
            <div className="absolute -top-16 -left-20 size-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -bottom-20 -right-16 size-72 rounded-full bg-secondary/15 blur-3xl" />
          </div>

          <div className="relative p-6 sm:p-8 space-y-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
                <p className="text-sm text-base-content/60 mt-1">Your profile information</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/60 px-3 py-1 text-xs text-base-content/70">
                <BadgeCheck className="size-4 text-emerald-500" />
                <span>Active</span>
              </div>
            </div>

          {/* avatar upload section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-1 flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-sm" />
                  <img
                    src={selectedImg || authUser?.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="relative size-32 rounded-full object-cover ring-4 ring-base-100 shadow-sm"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`absolute bottom-0 right-0 btn btn-circle btn-sm bg-base-100 border-base-300 hover:bg-base-200 shadow-sm ${
                      isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                    }`}
                    title="Update photo"
                  >
                    <Camera className="size-4" />
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
                <p className="text-xs text-base-content/60">
                  {isUpdatingProfile ? "Uploading..." : "Tap the camera to update your photo"}
                </p>
              </div>

              <div className="md:col-span-2 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-base-300 bg-base-100/60 px-4 py-3">
                    <div className="text-xs text-base-content/60 flex items-center gap-2">
                      <User className="size-4" />
                      Full Name
                    </div>
                    <div className="mt-1 font-semibold">{authUser?.fullName || "-"}</div>
                  </div>

                  <div className="rounded-2xl border border-base-300 bg-base-100/60 px-4 py-3">
                    <div className="text-xs text-base-content/60 flex items-center gap-2">
                      <Mail className="size-4" />
                      Email
                    </div>
                    <div className="mt-1 font-semibold break-all">{authUser?.email || "-"}</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-base-300 bg-base-100/60 p-5">
                  <h2 className="text-sm font-semibold mb-3">Account Information</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-base-300/60">
                      <span className="text-base-content/60">Member since</span>
                      <span className="font-medium">{memberSince}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-base-content/60">Account status</span>
                      <span className="font-medium text-emerald-500">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;