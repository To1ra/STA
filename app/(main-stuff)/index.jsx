import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useEffect } from "react";
import { useSQLiteDevTools } from "expo-sqlite-devtools";
import * as SQLite from "expo-sqlite";
import { useRouter } from "expo-router";

//arrow function
const db = SQLite.openDatabaseSync("myDataBase");

const Home = () => {
  async function fun() {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS WAGE_RATES (
      name TEXT NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      startHour TEXT NOT NULL,
      endHour TEXT NOT NULL,
      rate INTEGER NOT NULL,
      extraHorusCount INTEGER NOT NULL DEFAULT 8,
      extraHourtsCalc TEXT NOT NULL DEFAULT '125|150'
    );
  `);
  }

  useEffect(() => {}, []);
  useSQLiteDevTools(db);

  return (
    <Layout style={{ backgroundColor: "#161616", height: "100%" }}>
      <Text style={{ color: "#fff" }}>This is index</Text>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({});
