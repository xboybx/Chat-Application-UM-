import React, { useState, useRef, useEffect } from 'react';
import { Send, Hash, Users } from 'lucide-react';

interface Message {
  id: string | number;
  text: string;
  username: string;
  timestamp: string;
  formatted: string;
}

interface ChatRoomProps {
  room: { id: string; name: string; userCount: number } | null;
  messages: Message[];
  user: { username: string };
  onSendMessage: (text: string) => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ room, messages, user, onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageText.trim()) return;
    
    onSendMessage(messageText);
    setMessageText('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!room) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Hash className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white/70 mb-2">
            Welcome to ChatFlow
          </h2>
          <p className="text-white/50">
            Select a room from the sidebar to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Room Header */}
      <div className="p-6 border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Hash className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">{room.name}</h2>
              <div className="flex items-center gap-1 text-white/50 text-sm">
                <Users className="w-4 h-4" />
                {room.userCount} {room.userCount === 1 ? 'user' : 'users'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-white/50 mt-20">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.username === user.username ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-2xl backdrop-blur-xl border ${
                  message.username === user.username
                    ? 'bg-blue-500/20 border-blue-500/30 text-blue-100'
                    : 'bg-white/10 border-white/20 text-white'
                }`}
              >
                {message.username !== user.username && (
                  <div className="text-sm font-semibold text-blue-300 mb-1">
                    {message.username}
                  </div>
                )}
                <div 
                  className="break-words"
                  dangerouslySetInnerHTML={{ __html: message.formatted }}
                />
                <div className={`text-xs mt-2 ${
                  message.username === user.username 
                    ? 'text-blue-200/70' 
                    : 'text-white/50'
                }`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-6 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30 text-xs">
              **bold** *italic*
            </div>
          </div>
          <button
            type="submit"
            disabled={!messageText.trim()}
            className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        
        <div className="mt-2 text-xs text-white/40">
          Formatting: **bold**, *italic*, or paste links for auto-linking
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;