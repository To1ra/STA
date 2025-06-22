import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
import { titleParser } from "../../constans/Constans";
import { RefProvider, useSharedRef } from "../../Context/FormContext";
import { notSqlite } from "../../constans/Constans";
const OutsideLayout = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <RefProvider>
        <InnerLayout />
      </RefProvider>
    </ApplicationProvider>
  );
};

const InnerLayout = () => {
  let data = useSharedRef();

  const submitData = () => {
    data = data.current;
    if (data["Table"])
      if (data["Table"]) submitDataSQLite();
      else submitDataSecureStore();
  };

  const submitDataSecureStore = async () => {
    data = data.current;
    console.log("This is my Secure Store ", data["Table"]);
    for (const field in data)
      await SecureStore.setItemAsync(field, data[field]);

    data = {};
  };

  const submitDataSQLite = async () => {
    console.log("This is my table ", data["Table"]);
    // data = data.current;
    // if (route.name)
    //   for (const field in data) {
    //     if (notSqlite.includes(field))
    //       await SecureStore.setItemAsync(field, data[field]);
    //   }
    // data = {};
  };

  return (
    <Stack
      initialRouteName="BasicSalary"
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => {
          return navigation.canGoBack() ? (
            <Button
              title="Go Back"
              onPress={() => {
                data.current = {};
                navigation.goBack();
              }}
            />
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
  );
};
export default OutsideLayout;

const styles = StyleSheet.create({});
