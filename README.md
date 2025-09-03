# ChatFlow - Real-time Chat Application

![ChatFlow Banner](https://via.placeholder.com/800x200/6366f1/ffffff?text=ChatFlow+-+Real-time+Chat+Application)

## 🚀 Overview

ChatFlow is a modern, real-time chat application built with React.js and Socket.io. It features a beautiful glass morphism design, multiple chat rooms, and instant messaging capabilities. Perfect for teams, communities, or anyone who wants a clean, intuitive communication platform.

## ✨ Features

- **🔐 Simple Authentication** - Username-based login with duplicate checking
- **💬 Real-time Messaging** - Instant message delivery with Socket.io
- **🏠 Multiple Chat Rooms** - Pre-built and custom room creation
- **🎨 Beautiful UI** - Glass morphism design with responsive layout
- **📱 Mobile Friendly** - Works perfectly on all devices
- **✍️ Rich Text Formatting** - Support for **bold**, *italic*, and auto-linking
- **🔔 Smart Notifications** - Toast notifications for user events
- **👥 Live User Counts** - See how many people are in each room
- **⚡ Auto-scroll** - Always see the latest messages
- **🛡️ Input Validation** - Proper error handling and user feedback

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Socket.io Client** - Real-time communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and formatting
- **Concurrently** - Run multiple commands simultaneously

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chatflow.git
cd chatflow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

```bash
npm start
```

This command will:
- Start the Express.js server on port 3001
- Start the Vite development server on port 5173
- Open your browser automatically

### 4. Access the Application

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3001

## 📁 Project Structure

```
chatflow/
├── server/
│   └── index.js              # Express + Socket.io server
├── src/
│   ├── components/           # React components
│   │   ├── AuthScreen.jsx    # Login/authentication screen
│   │   ├── ChatInterface.jsx # Main chat container
│   │   ├── ChatRoom.jsx      # Chat messages display
│   │   ├── CreateRoomModal.jsx # Room creation modal
│   │   ├── Notification.jsx  # Toast notifications
│   │   └── RoomList.jsx      # Sidebar room list
│   ├── hooks/
│   │   └── useNotifications.js # Custom notification hook
│   ├── services/
│   │   └── socketService.js  # Socket.io client service
│   ├── utils/
│   │   ├── messageUtils.js   # Message formatting utilities
│   │   └── validation.js     # Input validation functions
│   ├── App.jsx               # Main application component
│   ├── index.css             # Global styles
│   └── main.jsx              # Application entry point
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # This file
```

## 🎮 How to Use

### Getting Started
1. **Enter Username**: Type a unique username (2-20 characters)
2. **Join a Room**: Select from "General", "Random", or create your own
3. **Start Chatting**: Type messages and see them appear instantly

### Creating Custom Rooms
1. Click the "Create Room" button in the sidebar
2. Enter a room name and optional description
3. Click "Create Room" to make it available to everyone

### Message Formatting
- **Bold text**: Type `**your text**`
- **Italic text**: Type `*your text*`
- **Links**: Paste any URL and it becomes clickable automatically

### Room Navigation
- Click any room in the sidebar to switch
- See live user counts for each room
- Get notified when users join or leave

## 🔧 Available Scripts

```bash
# Start both server and client in development mode
npm start

# Start only the backend server
npm run server

# Start only the frontend development server
npm run dev

# Build the project for production
npm run build

# Preview the production build
npm run preview

# Run ESLint for code quality
npm run lint
```

## 🌐 Environment Configuration

The application uses the following default ports:
- **Frontend (Vite)**: 5173
- **Backend (Express)**: 3001

To change these, modify:
- Frontend port: `vite.config.js`
- Backend port: `server/index.js` (PORT variable)

## 🔒 Security Features

- **Username Validation**: Prevents duplicate usernames and invalid inputs
- **Input Sanitization**: All user inputs are validated and sanitized
- **CORS Protection**: Configured for secure cross-origin requests
- **Real-time Validation**: Instant feedback on user actions

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill processes on ports 3001 and 5173
npx kill-port 3001 5173
```

**Dependencies Issues**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Socket Connection Issues**
- Check if the backend server is running on port 3001
- Ensure no firewall is blocking the connection
- Try refreshing the browser page

### Getting Help

If you encounter any issues:
1. Check the browser console for error messages
2. Verify both frontend and backend servers are running
3. Ensure all dependencies are properly installed
4. Check the terminal for any error logs

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed


## 🙏 Acknowledgments

- **React.js** team for the amazing framework
- **Socket.io** for real-time communication capabilities
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Vite** for the lightning-fast build tool

