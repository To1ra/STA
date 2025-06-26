import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, usePathname } from "expo-router";
import { titleParser } from "../constans/Constans";
import { SQLiteProvider } from "expo-sqlite";

const _layout = () => {
  return (
    <SQLiteProvider databaseName="myDataBase">
      <Stack>
        <Stack.Screen name="(main-stuff)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(view-stuff)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(modify-pages)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(add-pages)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SQLiteProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
