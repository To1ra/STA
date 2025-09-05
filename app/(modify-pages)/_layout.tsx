import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { titleParser } from "../../constans/Constans";
import { RefProvider, useSharedRef } from "../../Context/FormContext";
import { SubmitProvider } from "../../Context/FormSubmitContext";
import { submitData } from "../../utils/SQLite/Functions";

import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useSQLiteDevTools } from "expo-sqlite-devtools";

const OutsideLayout = () => {
  useEffect(() => {}, []);

  return (
    <SQLiteProvider databaseName="myDataBase">
      <RefProvider>
        <SubmitProvider>
          <InnerLayout />
        </SubmitProvider>
      </RefProvider>
    </SQLiteProvider>
  );
};

const InnerLayout = () => {
  const router = useRouter();
  const db = useSQLiteContext();
  const dataRef = useSharedRef();
  useSQLiteDevTools(db);

  return (
    <Stack
      initialRouteName="BasicSalary"
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => {
          return navigation.canGoBack() ? (
            <Button
              title="Go Back"
              onPress={() => {
                if (Object.keys(dataRef.current).length != 0)
                  dataRef.current = {};
                navigation.goBack();
              }}
            />
          ) : null;
        },
        headerRight: () => {
          return (
            <Button
              title="check"
              onPress={() => {
                submitData(db, dataRef);
                if (route.name.toLocaleLowerCase().includes("Wage")) {
                  router.push("/ListWageRates");
                  return;
                }
                router.push("/");
              }}
            />
          );
        },

        headerTitle: () => {
          return <Text>{titleParser[route.name]}</Text>;
        },
      })}
    >
      <Stack.Screen name="BasicSalary" />
      <Stack.Screen name="NewShift" />
      <Stack.Screen name="EditShift" />
      <Stack.Screen name="WageRate" />
    </Stack>
  );
};
export default OutsideLayout;

const styles = StyleSheet.create({});
