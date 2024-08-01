import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import NotificationItem from '../../components/NotificationItem';
import { theme } from '../../assets/constants/theme';

const Notifications = () => {
  const { notifications, setNotifications, setNotificationCount } = useAuth();

  const removeNotification = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
    setNotificationCount((prevCount) => prevCount - 1);
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
