import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

const _layout: React.FC = () => {
  return (
      <Stack initialRouteName="ShowShift">
        <Stack.Screen name="ShowShift" options={{ title: "hi" }} />
      </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
