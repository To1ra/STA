import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useEffect } from "react";
import { useSQLiteDevTools } from "expo-sqlite-devtools";
import * as SQLite from "expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import {
  create_Table_ALLSHIFTS,
  create_Table_WAGETATES,
} from "../../utils/SQLite/Functions";
//arrow function

const Home = () => {
  const db = useSQLiteContext();

  useEffect(() => {
    // create_Table_WAGETATES(db); //fix the table to have also end-date
    // console.log("hello");
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
