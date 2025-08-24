import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack, useRouter } from "expo-router";
import { titleParser } from "../../constans/Constans";

const OutsideLayout: React.FC = () => {
  const router = useRouter();

  const addData = (route: string) => {
    const currentRoute = route;
    const destiantionRoute = currentRoute.replace("List", "");
    router.push("(modify-pages)/" + destiantionRoute);
  };

  return (
      <Stack
        initialRouteName="ListWageRate"
        screenOptions={({ route, navigation }) => ({
          headerLeft: () => {
            return navigation.canGoBack() ? (
              <Button title="Go Back" onPress={() => navigation.goBack()} />
            ) : null;
          },
          headerRight: () => {
            return <Button title="Add" onPress={() => addData(route.name)} />;
          },

          headerTitle: () => {
            return (
              <Text>{titleParser[route.name as keyof typeof titleParser]}</Text>
            );
          },
        })}
      >
        <Stack.Screen name="ListWageRate" />
      </Stack>
  );
};

export default OutsideLayout;

const styles = StyleSheet.create({});
