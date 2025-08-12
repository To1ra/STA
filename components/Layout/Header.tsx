// components/CustomHeader.tsx
import UserPic from "./UserPic";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { titleParser } from "../../constans/Constans";
import React from "react";

interface HeaderProps {
  title: string;
  navigation: {
    openDrawer: () => void;
  };
}

const Header: React.FC<HeaderProps> = ({ title, navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <UserPic />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.title}>{titleParser[title]}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#161616",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bottomRow: {
    paddingTop: "8%",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 48,
    fontFamily: "Poppins",
  },

  menu: {
    color: "#fff",
    fontSize: 38, // Smaller, cleaner icon to match minimalism
  },
});
