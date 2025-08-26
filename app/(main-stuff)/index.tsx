import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useSQLiteDevTools } from "expo-sqlite-devtools";
import * as SQLite from "expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import {
  create_Table_ALLSHIFTS,
  create_Table_WAGETATES,
} from "../../utils/SQLite/Functions";
import React from "react";
//arrow function

const Home: React.FC = () => {
  const db = useSQLiteContext();
  


  useSQLiteDevTools(db);

  return (
    <View style={{ backgroundColor: "#161616", height: "100%" }}>
      <Text style={{ color: "#fff" }}>This is index</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
