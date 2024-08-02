import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import moment from "moment";
import { theme } from "../assets/constants/theme";
import imgs from "../assets/constants/imgs";
import FeatherIcon from "react-native-vector-icons/Feather";
import { updateNotificationToChecked } from "../services/notificationService";

const NotificationItem = ({ router, item, removeNotification }) => {
  const createdAt = moment(item?.created_at).format("MMM D");
  const notificationType = item?.type;
  const senderPseudonyme = item?.sender?.pseudonyme || "Unknown sender";

  let content;

  switch (notificationType) {
    case "new_poll":
      content = `Nouveau sondage publié par ${senderPseudonyme}`;
      break;
    case "new_follower":
      content = `${senderPseudonyme} vous suit désormais`;
      break;
    case "new_comment":
      content = `${senderPseudonyme} vient de commenter votre sondage`;
      break;
    case "new_like":
      content = `${senderPseudonyme} vient d'aimer votre sondage`;
      break;
    default:
      content = "unknown notification";
  }

  const handleNotificationClick = () => {
    // let { pollUd, commentId } = JSON.parse(item?.data);
    // router.push({ pathname: "postDetails", params: { postId, commentId } });
  };

  const handleCheckClick = async () => {
    const { success, msg } = await updateNotificationToChecked(item.id);
    if (success) {
      removeNotification(item.id);
    } else {
      console.log(msg);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNotificationClick} style={styles.notificationContent}>
        <Image source={imgs.quizzIcon} style={{ width: 60, height: 60 }} />
        <View style={{ gap: 2, justifyContent: 'center', paddingLeft: 4 }}>
          <Text style={{ ...styles.text, color: theme.colors.textLight }}>
            {createdAt}
          </Text>
          <Text
            style={{
              ...styles.text,
              color: theme.colors.textDark,
              maxWidth: 250,
            }}
          >
            {content}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCheckClick}>
        <FeatherIcon
          color="black"
          name={"check"}
          size={24}
          strokeWidth={2.5}
          style={{ paddingRight: 8 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: theme.colors.darkLight,
    padding: 8,
    borderRadius: 12,
    borderCurve: "continuous",
  },
  notificationContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
  },
});

export default NotificationItem;
