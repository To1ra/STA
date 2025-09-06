import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack, useRouter } from "expo-router";
import { titleParser } from "../../constans/Constans";
import { SQLiteProvider } from "expo-sqlite";
import { RefProvider } from "../../Context/FormContext";
import { SubmitProvider } from "../../Context/FormSubmitContext";

const OutsideLayout: React.FC = () => {
  const router = useRouter();

  const addData = (route: string) => {
    if (route.includes("NewShift")) {
      router.push("/shiftTracker");
    }

    const currentRoute = route;
    const destiantionRoute = currentRoute.replace("List", "");
    router.push("(modify-pages)/" + destiantionRoute);
  };

  return (
    <SQLiteProvider databaseName="myDataBase">
      <RefProvider>
        <SubmitProvider>
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
                  <Button title="Add" onPress={() => addData(route.name)} />
                );
              },

              headerTitle: () => {
                return (
                  <Text>
                    {titleParser[route.name as keyof typeof titleParser]}
                  </Text>
                );
              },
            })}
          >
            <Stack.Screen name="ListWageRate" />
            <Stack.Screen name="NewShift" />
          </Stack>
        </SubmitProvider>
      </RefProvider>
    </SQLiteProvider>
  );
};

export default OutsideLayout;

const styles = StyleSheet.create({});
