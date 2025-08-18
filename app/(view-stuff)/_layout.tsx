import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";

const _layout: React.FC = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Stack initialRouteName="ShowShift">
        <Stack.Screen name="ShowShift" options={{ title: "hi" }} />
      </Stack>
    </ApplicationProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
