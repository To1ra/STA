import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useEffect } from "react";
import { useSQLiteDevTools } from "expo-sqlite-devtools";
import * as SQLite from "expo-sqlite";
import { useRouter } from "expo-router";

//arrow function
const db = SQLite.openDatabaseSync("myDataBase");

const Home = () => {
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
