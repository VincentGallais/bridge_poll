import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../../services/notificationService';
import { useAuth } from '../../contexts/AuthContext';
import NotificationItem from '../../components/NotificationItem';
import { theme } from '../../assets/constants/theme';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user, setNotificationCount } = useAuth();

  useEffect(() => {
    getNotifications();
    setNotificationCount(0)
  }, []);

  const getNotifications = async () => {
    let res = await fetchNotifications(user.id);
    if (res.success) setNotifications(res.data);
  };

  const removeNotification = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listStyle}>
        {notifications.map((item) => (
          <NotificationItem 
            key={item.id}
            item={item} 
            router={[]} 
            removeNotification={removeNotification}
          />
        ))}
        {notifications.length === 0 && (
          <Text style={styles.noData}>Any notifications yet</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
    marginVertical: 16,
    marginHorizontal: 8,
    gap: 8,
  },
  noData: {
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
    textAlign: 'center',
  },
});

export default Notifications;
