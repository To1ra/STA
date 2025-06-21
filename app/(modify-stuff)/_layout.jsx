import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
import { titleParser } from "../../constans/Constans";

const _layout = () => {
  const submitData = () => {};

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Stack
        initialRouteName="BasicSalary"
        screenOptions={({ route, navigation }) => ({
          headerLeft: () => {
            return navigation.canGoBack() ? (
              <Button title="Go Back" onPress={() => navigation.goBack()} />
            ) : null;
          },
          headerRight: () => {
            return <Button title="check" onPress={() => submitData()} />;
          },

          headerTitle: () => {
            return <Text>{titleParser[route.name]}</Text>;
          },
        })}
      >
        <Stack.Screen name="BasicSalary" />
      </Stack>
    </ApplicationProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
