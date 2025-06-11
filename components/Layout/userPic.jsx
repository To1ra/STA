import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function UserPic({ style }) {
  return (
    <View style={[styles.pic, style]}>
      <Image source=""></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  pic: {
    display: "flex",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
    backgroundColor: "#eee",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
