import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Spacer from "../Spacer";

const Container = ({ title, children, style }) => {
  return (
    <View style={{ justifyContent: "center" }}>
      <Text style={{ textAlign: "right", padding: "10" }}>{title}</Text>
      <Spacer />
      <View style={style}>{children}</View>
      <Spacer />
      <Spacer />
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({});
