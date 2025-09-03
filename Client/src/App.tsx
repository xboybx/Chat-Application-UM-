import React, { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import ChatInterface from './components/ChatInterface';
import { socketService } from './services/socketService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleAuthenticate = async (username) => {
    setIsConnecting(true);
    
    try {
      const result = await socketService.authenticate(username);
      
      if (result.success) {
        setUser({ username });
        setIsAuthenticated(true);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLogout = () => {
    socketService.disconnect();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {!isAuthenticated ? (
        <AuthScreen 
          onAuthenticate={handleAuthenticate}
          isConnecting={isConnecting}
        />
      ) : (
        <ChatInterface 
          user={user}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;