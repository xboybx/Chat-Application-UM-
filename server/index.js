import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store active users and rooms
const activeUsers = new Map();
const chatRooms = new Map();

// Initialize default rooms
chatRooms.set('general', {
  id: 'general',
  name: 'General',
  description: 'General discussion for everyone',
  users: new Set(),
  messages: []
});

chatRooms.set('random', {
  id: 'random',
  name: 'Random',
  description: 'Random conversations and fun',
  users: new Set(),
  messages: []
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user authentication
  socket.on('authenticate', (userData, callback) => {
    const { username } = userData;

    // Check if username is already taken
    const isUsernameTaken = Array.from(activeUsers.values()).some(user => user.username === username);

    if (isUsernameTaken) {
      callback({ success: false, error: 'Username is already taken' });
      return;
    }

    // Store user data
    activeUsers.set(socket.id, {
      id: socket.id,
      username,
      joinedAt: new Date()
    });

    callback({ success: true });

    // Send available rooms
    const rooms = Array.from(chatRooms.values()).map(room => ({
      id: room.id,
      name: room.name,
      description: room.description,
      userCount: room.users.size
    }));

    socket.emit('rooms_list', rooms);
  });

  // Handle joining a room
  socket.on('join_room', (roomId) => {
    const user = activeUsers.get(socket.id);
    if (!user) return;

    // Leave previous room
    socket.rooms.forEach(room => {
      if (room !== socket.id) {
        socket.leave(room);
        const prevRoom = chatRooms.get(room);
        if (prevRoom) {
          prevRoom.users.delete(socket.id);
          socket.to(room).emit('user_left', user.username);
        }
      }
    });

    // Join new room
    socket.join(roomId);
    const room = chatRooms.get(roomId);

    if (room) {
      room.users.add(socket.id);
      user.currentRoom = roomId;

      // Send room messages to user
      socket.emit('room_messages', room.messages);

      // Notify room about new user
      socket.to(roomId).emit('user_joined', user.username);

      // Send updated user count
      const updatedRoom = {
        id: room.id,
        name: room.name,
        description: room.description,
        userCount: room.users.size
      };
      io.emit('room_updated', updatedRoom);
    }
  });

  // Handle sending messages
  socket.on('send_message', (messageData) => {
    const user = activeUsers.get(socket.id);
    if (!user || !user.currentRoom) return;

    const room = chatRooms.get(user.currentRoom);
    if (!room) return;

    const message = {
      id: Date.now() + Math.random(),
      text: messageData.text,
      username: user.username,
      timestamp: new Date(),
      formatted: formatMessage(messageData.text)
    };

    room.messages.push(message);

    // Keep only last 100 messages per room
    if (room.messages.length > 100) {
      room.messages = room.messages.slice(-100);
    }

    // Broadcast message to room
    io.to(user.currentRoom).emit('new_message', message);
  });

  // Handle creating new room
  socket.on('create_room', (roomData, callback) => {
    const user = activeUsers.get(socket.id);
    if (!user) return;

    const roomId = roomData.name.toLowerCase().replace(/\s+/g, '-');

    if (chatRooms.has(roomId)) {
      callback({ success: false, error: 'Room already exists' });
      return;
    }

    const newRoom = {
      id: roomId,
      name: roomData.name,
      description: roomData.description || 'User created room',
      users: new Set(),
      messages: [],
      createdBy: user.username,
      createdAt: new Date()
    };

    chatRooms.set(roomId, newRoom);

    // Broadcast new room to all users
    const roomInfo = {
      id: newRoom.id,
      name: newRoom.name,
      description: newRoom.description,
      userCount: 0
    };

    io.emit('new_room', roomInfo);
    callback({ success: true, room: roomInfo });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      // Remove user from room
      if (user.currentRoom) {
        const room = chatRooms.get(user.currentRoom);
        if (room) {
          room.users.delete(socket.id);
          socket.to(user.currentRoom).emit('user_left', user.username);

          // Send updated user count
          const updatedRoom = {
            id: room.id,
            name: room.name,
            description: room.description,
            userCount: room.users.size
          };
          io.emit('room_updated', updatedRoom);
        }
      }

      activeUsers.delete(socket.id);
    }
    console.log('User disconnected:', socket.id);
  });
});

// Simple message formatting
function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">$1</a>');
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});