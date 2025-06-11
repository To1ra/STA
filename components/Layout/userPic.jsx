import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const UserPic = ({ style }) => {
  return (
    <View style={style}>
      <Image
        style={styles.pic}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      ></Image>
    </View>
  );
};

export default UserPic;

const styles = StyleSheet.create({
  pic: {
    display: "flex",
    width: 50,
    height: 50,
    borderRadius: 30,
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
