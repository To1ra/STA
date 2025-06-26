import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
import { titleParser } from "../../constans/Constans";
import { RefProvider, useSharedRef } from "../../Context/FormContext";
import { SubmitProvider } from "../../Context/FormSubmitContext";
import * as SecureStore from "expo-secure-store";
import * as SQLite from "expo-sqlite";
import { useSQLiteDevTools } from "expo-sqlite-devtools";

const db = SQLite.openDatabaseSync("myDataBase");

const OutsideLayout = () => {
  useSQLiteDevTools(db);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <RefProvider>
        <SubmitProvider>
          <InnerLayout />
        </SubmitProvider>
      </RefProvider>
    </ApplicationProvider>
  );
};

const InnerLayout = () => {
  const dataRef = useSharedRef();
  const router = useRouter();

  const submitData = () => {
    if (!dataRef?.current) return;
    const data = dataRef.current;

    if (data["Table"]) {
      submitDataSQLite(data);
    } else {
      submitDataSecureStore(data);
    }
    dataRef.current = {};
  };

  const submitDataSecureStore = async (data) => {
    console.log("This is my Secure Store ", data["Table"]);
    console.log(data);
    for (const field in data) {
      try {
        console.log("Saving:", field, "=", data[field]);
        await SecureStore.setItemAsync(field, data[field]);
      } catch (err) {
        console.error("❌ Failed saving field:", field, err);
      }
    }
    console.log("✅ Done saving all fields");
  };

  const submitDataSQLite = async (data) => {
    try {
      if (!data.edit) {
        const table = data.Table;
        delete data.Table;
        const fields = Object.keys(data);
        const values = fields.map((field) => {
          let val = data[field];
          if (field.toLowerCase().includes("hour")) {
            val = val.toString().split(" ")[4]?.split(":00")[0] || val;
          }
          return `'${val}'`; // wrap in quotes to avoid SQL injection issues
        });

        const sqlString = `INSERT INTO ${table} (${fields.join(
          ","
        )}) VALUES (${values.join(",")})`;

        await db.execAsync(sqlString);
      }
    } catch (err) {
      console.log(err);
    }
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
                submitData();
                if (route.name.includes("basic")) return;
                const destiantionRoute = "List" + route.name;

                router.push("../(add-pages)/" + destiantionRoute);
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
