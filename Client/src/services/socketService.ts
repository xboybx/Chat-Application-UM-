import io, { Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(`${import.meta.env.VITE_BACKEND_URL}`);
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  authenticate(username: string): Promise<{ success: boolean; error?: string }> {
    return new Promise((resolve) => {
      if (!this.socket) {
        this.connect();
      }
      
      this.socket!.emit('authenticate', { username }, (response: any) => {
        resolve(response);
      });
    });
  }

  joinRoom(roomId: string) {
    if (this.socket) {
      this.socket.emit('join_room', roomId);
    }
  }

  sendMessage(messageData: { text: string }) {
    if (this.socket) {
      this.socket.emit('send_message', messageData);
    }
  }

  createRoom(roomData: { name: string; description?: string }): Promise<{ success: boolean; error?: string; room?: any }> {
    return new Promise((resolve) => {
      if (this.socket) {
        this.socket.emit('create_room', roomData, (response: any) => {
          resolve(response);
        });
      }
    });
  }

  // Event listeners
  onRoomsList(callback: (rooms: any[]) => void) {
    if (this.socket) {
      this.socket.on('rooms_list', callback);
    }
  }

  onRoomMessages(callback: (messages: any[]) => void) {
    if (this.socket) {
      this.socket.on('room_messages', callback);
    }
  }

  onNewMessage(callback: (message: any) => void) {
    if (this.socket) {
      this.socket.on('new_message', callback);
    }
  }

  onNewRoom(callback: (room: any) => void) {
    if (this.socket) {
      this.socket.on('new_room', callback);
    }
  }

  onRoomUpdated(callback: (room: any) => void) {
    if (this.socket) {
      this.socket.on('room_updated', callback);
    }
  }

  onUserJoined(callback: (username: string) => void) {
    if (this.socket) {
      this.socket.on('user_joined', callback);
    }
  }

  onUserLeft(callback: (username: string) => void) {
    if (this.socket) {
      this.socket.on('user_left', callback);
    }
  }

  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }
}

export const socketService = new SocketService();