import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(main-stuff)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(view-stuff)"
        options={{ title: "Show Shift", headerBackTitle: "Go Back" }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
