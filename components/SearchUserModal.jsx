import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { searchUser, addFollower } from "../services/userService";
import { useAuth } from "../contexts/AuthContext";

const { width } = Dimensions.get("window");

const UserItem = ({ user, onSubscribe }) => (
  <View style={styles.userItem}>
    <Text style={styles.userName}>{user.pseudonyme}</Text>
    <TouchableOpacity style={styles.subscribeButton} onPress={() => onSubscribe(user)}>
      <Text style={styles.subscribeButtonText}>S'abonner</Text>
    </TouchableOpacity>
  </View>
);

const SearchUserModal = ({ visible, onClose }) => {
  const { user: currentUser } = useAuth();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    if (query.trim().length >= 3 && currentUser?.id) {
      const res = await searchUser(query, currentUser.id); // Passer l'ID de l'utilisateur courant
      if (res.success) {
        setUsers(res.data);
      } else {
        console.error(res.msg);
      }
    }
  };

  const handleSubscribe = async (user) => {
    if (currentUser?.id) {
      const res = await addFollower(user.id, currentUser.id);
      if (res.success) {
        console.log("Successfully followed", user.pseudonyme);
      } else {
        console.error("Failed to follow", res.msg);
      }
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Chercher un utilisateur</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <FeatherIcon name="x" size={24} color="#1d1d1d" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          {renderHeader()}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Tapez au moins 3 caractères"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
              />
              <TouchableOpacity
                style={[styles.searchIconContainer, { opacity: query.trim().length >= 3 ? 1 : 0.5 }]}
                onPress={query.trim().length >= 3 ? handleSearch : null}
                disabled={query.trim().length < 3}
              >
                <FeatherIcon name="search" size={20} color="#1d1d1d" />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={users}
            renderItem={({ item }) => <UserItem user={item} onSubscribe={handleSubscribe} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContainer}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: width - 32,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1d1d1d",
  },
  closeButton: {
    padding: 10,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  searchIconContainer: {
    padding: 10,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 16,
  },
  userName: {
    fontSize: 16,
  },
  subscribeButton: {
    backgroundColor: "#28a745",
    padding: 5,
    borderRadius: 5,
  },
  subscribeButtonText: {
    color: "white",
  },
  flatListContainer: {
    paddingBottom: 20,
  },
});

export default SearchUserModal;
