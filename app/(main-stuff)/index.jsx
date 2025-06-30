import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useEffect } from "react";
import { useSQLiteDevTools } from "expo-sqlite-devtools";
import * as SQLite from "expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

//arrow function

const Home = () => {
  const db = useSQLiteContext();
  const func = async () => {
    await db.execAsync(`DROP TABLE IF EXISTS ALL_SHIFTS;

CREATE TABLE ALL_SHIFTS (
    id              INTEGER PRIMARY KEY NOT NULL,
    dayDate         INTEGER NOT NULL,
    monthDate       INTEGER NOT NULL,
    yearDate        INTEGER NOT NULL,
    startTime       TEXT NOT NULL,
    endTime         TEXT NOT NULL,
    note            TEXT,
    hoursWorked     REAL NOT NULL,
    rateObj         TEXT NOT NULL,
    totalSalary     REAL NOT NULL DEFAULT 0,
    color           TEXT NOT NULL DEFAULT 'black'
);
`);
  };
  useEffect(() => {
    func();
  }, []);
  useSQLiteDevTools(db);

  return (
    <Layout style={{ backgroundColor: "#161616", height: "100%" }}>
      <Text style={{ color: "#fff" }}>This is index</Text>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({});
