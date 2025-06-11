import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavBar from "./NavBar";
import UserPic from "./UserPic";
import { useRouter } from "expo-router";
import { Directions } from "react-native-gesture-handler";

const Header = (prop) => {
  const router = useRouter();
  return (
    <View style={styles.Container}>
      <UserPic style={styles.UserPic} />
      <Text style={styles.Title}>{prop.title}</Text>
      <NavBar style={styles.Nav} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Container: {
    height: "16%",
    display: "flex",
    backgroundColor: "red",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  UserPic: { display: "flex" },
  Nav: {},
  Title: {
    marginTop: "12%",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
