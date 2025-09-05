import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { titleParser } from "../../constans/Constans";
import { setShiftData } from "../../utils/Storage/wantedShift";
const _layout: React.FC = () => {
  return (
    <Stack
      initialRouteName="ShowShift"
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => {
          return navigation.canGoBack() ? (
            <Button
              title="Go Back"
              onPress={() => {
                setShiftData(null);
                navigation.goBack();
              }}
            />
          ) : null;
        },

        headerTitle: () => {
          return <Text>{titleParser[route.name]}</Text>;
        },
      })}
    >
      <Stack.Screen name="ShowShift" />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
