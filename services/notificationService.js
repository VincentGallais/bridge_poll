import { supabase } from "../lib/supabase";

export const createNotification = async (notification) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert(notification)
      .select()
      .single();

    if (error) {
      console.log("notification error: ", error);
      return { success: false, msg: "Something went wrong!" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("notification error: ", error);
    return { success: false, msg: "Something went wrong!" };
  }
};

export const fetchNotifications = async (receiverId) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select(
        `
            *,
            sender: senderId ( id, pseudonyme, image )
        `
      )
      .order("created_at", { ascending: false })
      .eq("receiverId", receiverId)
      .eq("checked", false);

    if (error) {
      console.log("fetchNotifications error: ", error);
      return { success: false, msg: "Could not fetch the notifications" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("fetchNotifications error: ", error);
    return { success: false, msg: "Something went wrong!" };
  }
};

export const fetchSenderDetails = async (senderId) => {
  try {
    const { data, error } = await supabase
      .from("users") // Assuming the table name is 'users'
      .select("id, pseudonyme, image")
      .eq("id", senderId)
      .single();

    if (error) {
      console.log("fetchSenderDetails error: ", error);
      return { success: false, msg: "Could not fetch the sender details" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("fetchSenderDetails error: ", error);
    return { success: false, msg: "Something went wrong!" };
  }
};

export const updateNotificationToChecked = async (notificationId) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .update({ checked: true })
      .eq("id", notificationId);

    if (error) {
      console.log("updateNotificationToChecked error: ", error);
      return { success: false, msg: "Could not update the notification" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("updateNotificationToChecked error: ", error);
    return { success: false, msg: "Something went wrong!" };
  }
};

export const subscribeToNotifications = (userId, handleNewNotification) => {
  const notificationChannel = supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `receiverId=eq.${userId}`,
      },
      handleNewNotification
    )
    .subscribe();

  return notificationChannel;
};

export const unsubscribeFromNotifications = (notificationChannel) => {
  supabase.removeChannel(notificationChannel);
};
