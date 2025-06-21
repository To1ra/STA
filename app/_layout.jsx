import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, usePathname } from "expo-router";
import { titleParser } from "../constans/Constans";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(main-stuff)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(view-stuff)"
        options={{ title: "HEY", headerBackTitle: "Go Back" }}
      />

      <Stack.Screen
        name="(modify-stuff)"
        options={{
          title: "HEY",
          headerBackTitle: "Go Back",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
