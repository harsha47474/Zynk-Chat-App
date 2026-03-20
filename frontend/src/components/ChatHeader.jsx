import React from 'react'
import { ArrowLeft, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();

  if (!selectedUser) return null;

  return (
    <div className="p-3 border-b border-base-300 bg-base-100/60 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Back/Close button
            - Mobile: shows ArrowLeft (← Back to contacts)
            - Desktop: shows X (close panel)
            Both call setSelectedUser(null) which toggles back to sidebar on mobile */}
        <button
          className="btn btn-ghost btn-sm btn-circle"
          onClick={() => setSelectedUser(null)}
          title="Back to contacts"
        >
          {/* Arrow on mobile, X on desktop */}
          <ArrowLeft className="size-5 block md:hidden" />
          <X className="size-5 hidden md:block" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;