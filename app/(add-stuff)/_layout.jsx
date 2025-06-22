import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
import { titleParser } from "../../constans/Constans";

const OutsideLayout = () => {
  const addData = (navigation, route) => {
    const currentRoute = route;
    const destiantionRoute = currentRoute.replace("List", "");
    navigation.navigate("(modify-pages)" + destiantionRoute);
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Stack
        initialRouteName="ListWageRate"
        screenOptions={({ route, navigation }) => ({
          headerLeft: () => {
            return navigation.canGoBack() ? (
              <Button title="Go Back" onPress={() => navigation.goBack()} />
            ) : null;
          },
          headerRight: () => {
            return (
              <Button
                title="check"
                onPress={() => addData(navigation, route.name)}
              />
            );
          },

          headerTitle: () => {
            return <Text>{titleParser[route.name]}</Text>;
          },
        })}
      >
        <Stack.Screen name="ListWageRate" />
      </Stack>
    </ApplicationProvider>
  );
};

export default OutsideLayout;

const styles = StyleSheet.create({});
