import React from 'react';
import { Plus, Hash, Users, LogOut, MessageCircle } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  description: string;
  userCount: number;
}

interface RoomListProps {
  rooms: Room[];
  currentRoom: Room | null;
  user: { username: string };
  onJoinRoom: (roomId: string) => void;
  onCreateRoom: () => void;
  onLogout: () => void;
}

const RoomList: React.FC<RoomListProps> = ({
  rooms,
  currentRoom,
  user,
  onJoinRoom,
  onCreateRoom,
  onLogout
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold">ChatFlow</h1>
            <p className="text-white/50 text-sm">Welcome, {user.username}</p>
          </div>
        </div>
        
        <button
          onClick={onCreateRoom}
          className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Room
        </button>
      </div>

      {/* Rooms List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onJoinRoom(room.id)}
              className={`w-full p-3 rounded-xl text-left transition-all duration-200 group ${
                currentRoom?.id === room.id
                  ? 'bg-blue-500/20 border border-blue-500/30'
                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Hash className={`w-5 h-5 mt-0.5 ${
                    currentRoom?.id === room.id ? 'text-blue-400' : 'text-white/50'
                  }`} />
                  <div>
                    <h3 className={`font-medium ${
                      currentRoom?.id === room.id ? 'text-blue-100' : 'text-white'
                    }`}>
                      {room.name}
                    </h3>
                    <p className="text-white/50 text-sm mt-1">{room.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-white/40 text-xs">
                  <Users className="w-3 h-3" />
                  {room.userCount}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full py-2 px-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-100 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default RoomList;