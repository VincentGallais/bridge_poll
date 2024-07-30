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
    // we can specify the object: foreignkey (fields), eg: sender: senderId(id, name, image) or receiver: receiverId(id, name, iamge)
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
