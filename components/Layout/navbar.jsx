import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";

const NavBar = ({ style }) => {
  return (
    <View style={[styles.conatiner, style]}>
      <Text>navbar</Text>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  conatiner: {},
});
