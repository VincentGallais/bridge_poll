import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchNotifications, fetchSenderDetails, subscribeToNotifications, unsubscribeFromNotifications } from '../services/notificationService';
import { fetchPostsByUser } from '../services/postService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [userPosts, setUserPosts] = useState([]);

  const setAuth = (authUser) => {
    setUser(authUser);
  };

  const setUserData = (userData) => {
    setUser({ ...userData });
  };

  const fetchAndSetNotifications = async (userId) => {
    const res = await fetchNotifications(userId);
    if (res.success) {
      setNotifications(res.data);
      const uncheckedCount = res.data.filter(notification => !notification.checked).length;
      setNotificationCount(uncheckedCount);
    }
  };

  const fetchAndSetUserPosts = async (userId) => {
    const res = await fetchPostsByUser(userId);
    if (res.success) {
      setUserPosts(res.data);      
    }
  };

  const handleNewNotification = async (payload) => {
    console.log('got new notification:', payload);
    if (payload.eventType === 'INSERT' && payload?.new?.id) {
      const senderDetails = await fetchSenderDetails(payload.new.senderId);
      if (senderDetails.success) {
        const newNotification = { ...payload.new, sender: senderDetails.data };
        setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
        setNotificationCount((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchAndSetNotifications(user.id);
      fetchAndSetUserPosts(user.id);
      const notificationChannel = subscribeToNotifications(user.id, handleNewNotification);

      return () => {
        unsubscribeFromNotifications(notificationChannel);
      };
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setAuth, setUserData, notifications, setNotifications, notificationCount, setNotificationCount, userPosts }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
