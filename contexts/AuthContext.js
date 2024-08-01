import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const setAuth = (authUser) => {
    setUser(authUser);
  };

  const setUserData = (userData) => {
    setUser({ ...userData });
  };

  const handleNewNotification = (payload) => {
    console.log('got new notification:', payload);
    if (payload.eventType === 'INSERT' && payload?.new?.id) {
      setNotificationCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (user) {
      let notificationChannel = supabase
        .channel('notifications')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `receiverId=eq.${user.id}` }, handleNewNotification)
        .subscribe();

      return () => {
        supabase.removeChannel(notificationChannel);
      };
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setAuth, setUserData, notificationCount, setNotificationCount  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
