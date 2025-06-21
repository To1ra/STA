import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Spacer from "./Spacer";

const Container = ({ title, children, style }) => {
  return (
    <View style={{ alignSelf: "center" }}>
      <Spacer />
      <Spacer />

      <Text style={{ textAlign: "right" }}>{title}</Text>
      <Spacer />
      <View style={style}>{children}</View>
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({});
