import { StyleSheet, Text, View } from "react-native";
import { days } from "../../constans/Constans";
import DrawerMenuSelector from "../../components/DrawerMenuSelector";
import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabaseSync("myDataBase");

const playground = () => {
  return <View></View>;
};

export default playground;

const styles = StyleSheet.create({});
