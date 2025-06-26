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
    try {
      if (!dataRef?.current) return;
      const data = dataRef.current;

      if (data["Table"]) {
        if (data["edit"]) UpdateDataSQLite(data);
        else submitDataSQLite(data);
      } else {
        submitDataSecureStore(data);
      }
      dataRef.current = {};
    } catch (err) {
      console.log(err);
    }
  };

  const submitDataSecureStore = async (data) => {
    console.log("This is my Secure Store ");
    for (const field in data) {
      try {
        await SecureStore.setItemAsync(field, data[field]);
      } catch (err) {
        console.error("❌ Failed saving field:", field, err);
      }
    }
    console.log("✅ Done saving all fields");
  };

  const UpdateDataSQLite = async (data) => {
    try {
      await db.execAsync(
        "DELETE FROM WAGE_RATES WHERE id =" + data["id"] + ";"
      );
      await submitDataSQLite(data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitDataSQLite = async (data) => {
    try {
      if (data) {
        if (data.edit) {
          console.log(data);
        }
        const table = data.Table;
        delete data.Table;
        delete data.edit;
        const arr = ["starthour", "endhour"];
        const fields = Object.keys(data);
        const values = fields.map((field) => {
          let val = data[field];
          if (arr.includes(field.toLowerCase())) {
            if (val.length != 5) {
              const temp = new Date(val);
              console.log(temp, val);
              const h = String(temp.getHours()).padStart(2, "0");
              const m = String(temp.getMinutes()).padStart(2, "0");
              console.log(h, m);
              val = `${h}:${m}`;
            }
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
