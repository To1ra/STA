// components/CustomHeader.tsx
import React from "react";
import UserPic from "./UserPic";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Header = ({ title, navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text style={styles.menu}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {/* Add icons or buttons on the right if needed */}
      <TouchableOpacity onPress={() => {}}>
        <UserPic />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#6200ee",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
  menu: {
    color: "#fff",
    fontSize: 24,
  },
  settings: {
    color: "#fff",
    fontSize: 20,
  },
});
