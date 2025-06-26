import { StyleSheet, Text, View, FlatList } from "react-native";
import { days } from "../../constans/Constans";
import DrawerMenuSelector from "../../components/DrawerMenuSelector";
import React, { useEffect, useState } from "react";
import ListItem from "../../components/List/ListItem";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabaseSync("myDataBase");

// Everything works , just need to get more data to see hpw it load + need to remove that every and just display it to the user - its not neede inside the db itself
const playground = () => {
  const loadData = async () => {};

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <Text>check</Text>
    </View>
  );
};

export default playground;

const styles = StyleSheet.create({});
