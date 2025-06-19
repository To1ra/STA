import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stac } from "expo-router";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";

const _layout = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Slot initialRouteName="ShowShift" options={{ title: "hi" }} />
    </ApplicationProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
