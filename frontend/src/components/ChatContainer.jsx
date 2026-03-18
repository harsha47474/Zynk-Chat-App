import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();

  useEffect(()=>{
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id);
  }, [selectedUser?._id, getMessages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-sm text-base-content/60">messages...</p>
        <pre className="text-xs opacity-60 mt-3 whitespace-pre-wrap">{JSON.stringify(messages, null, 2)}</pre>
      </div>
      <div className="border-t border-base-300 p-3">
        <MessageInput />
      </div>
    </div>
  )
}

export default ChatContainer