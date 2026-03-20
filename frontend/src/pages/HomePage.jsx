import React from 'react'
import { useChatStore } from '../store/useChatStore.js'
import Sidebar from '../components/Sidebar.jsx'
import NoChatSelected from '../components/NoChatSelected.jsx'
import ChatContainer from '../components/ChatContainer.jsx'

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">

            {/* Sidebar:
                - Mobile: visible only when NO user is selected (hidden when chatting)
                - Desktop: always visible
            */}
            <div className={`
              ${selectedUser ? "hidden md:flex" : "flex"}
              w-full md:w-auto
            `}>
              <Sidebar />
            </div>

            {/* Chat area:
                - Mobile: visible only when a user IS selected (full width)
                - Desktop: always visible alongside sidebar
            */}
            <div className={`
              ${selectedUser ? "flex" : "hidden md:flex"}
              flex-1 flex-col
            `}>
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage