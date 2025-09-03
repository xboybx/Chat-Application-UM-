import React, { useState, useEffect } from 'react';
import RoomList from './RoomList';
import ChatRoom from './ChatRoom';
import CreateRoomModal from './CreateRoomModal';
import { socketService } from '../services/socketService';

interface ChatInterfaceProps {
  user: { username: string };
  onLogout: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ user, onLogout }) => {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Listen for rooms list
    socketService.onRoomsList((roomsList) => {
      setRooms(roomsList);
    });

    // Listen for room messages
    socketService.onRoomMessages((roomMessages) => {
      setMessages(roomMessages);
    });

    // Listen for new messages
    socketService.onNewMessage((message) => {
      setMessages(prev => [...prev, message]);
      
      // Show notification if not in focus
      if (document.hidden && message.username !== user.username) {
        showNotification(`${message.username}: ${message.text}`);
      }
    });

    // Listen for new rooms
    socketService.onNewRoom((room) => {
      setRooms(prev => [...prev, room]);
    });

    // Listen for room updates
    socketService.onRoomUpdated((updatedRoom) => {
      setRooms(prev => prev.map(room => 
        room.id === updatedRoom.id ? updatedRoom : room
      ));
    });

    // Listen for user events
    socketService.onUserJoined((username) => {
      showNotification(`${username} joined the room`, 'info');
    });

    socketService.onUserLeft((username) => {
      showNotification(`${username} left the room`, 'info');
    });

    return () => {
      socketService.removeAllListeners();
    };
  }, [user.username]);

  const handleJoinRoom = (roomId) => {
    socketService.joinRoom(roomId);
    const room = rooms.find(r => r.id === roomId);
    setCurrentRoom(room);
    setMessages([]);
  };

  const handleSendMessage = (text) => {
    socketService.sendMessage({ text });
  };

  const handleCreateRoom = async (roomData) => {
    try {
      const result = await socketService.createRoom(roomData);
      if (result.success) {
        setIsCreateRoomOpen(false);
        showNotification('Room created successfully!', 'success');
        // Auto-join the created room
        handleJoinRoom(result.room.id);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-80 backdrop-blur-xl bg-white/5 border-r border-white/10">
        <RoomList
          rooms={rooms}
          currentRoom={currentRoom}
          user={user}
          onJoinRoom={handleJoinRoom}
          onCreateRoom={() => setIsCreateRoomOpen(true)}
          onLogout={onLogout}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1">
        <ChatRoom
          room={currentRoom}
          messages={messages}
          user={user}
          onSendMessage={handleSendMessage}
        />
      </div>

      {/* Create Room Modal */}
      {isCreateRoomOpen && (
        <CreateRoomModal
          onClose={() => setIsCreateRoomOpen(false)}
          onCreate={handleCreateRoom}
        />
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`backdrop-blur-xl border rounded-xl p-4 shadow-lg ${
            notification.type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-100' :
            notification.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-100' :
            'bg-blue-500/20 border-blue-500/30 text-blue-100'
          }`}>
            {notification.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;