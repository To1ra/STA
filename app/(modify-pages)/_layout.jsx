import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
import { titleParser } from "../../constans/Constans";
import { RefProvider, useSharedRef } from "../../Context/FormContext";
import { SubmitProvider } from "../../Context/FormSubmitContext";
import { submitData } from "../../utils/SQLite/Functions";

import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useSQLiteDevTools } from "expo-sqlite-devtools";

const OutsideLayout = () => {
  useEffect(() => {}, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SQLiteProvider databaseName="myDataBase">
        <RefProvider>
          <SubmitProvider>
            <InnerLayout />
          </SubmitProvider>
        </RefProvider>
      </SQLiteProvider>
    </ApplicationProvider>
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
                if (dataRef) dataRef.current = {};
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
      <Stack.Screen name="WageRate" />
    </Stack>
  );
};
export default OutsideLayout;

const styles = StyleSheet.create({});
