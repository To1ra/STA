import { StyleSheet, View } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";
import React, { useEffect } from "react";
import Shift from "../components/ShiftTracker/Shift";
import * as SQLite from "expo-sqlite";

const shiftTracker = () => {
  // const displayData = async (Month) => {
  //   const db = await SQLite.openDatabaseAsync("myDataBase");
  //   const allRows = await db.getAllAsync("SELECT * FROM allShifts");

  //   return (
  //     <Layout>
  //       {allRows.map((row) => {
  //         return (
  //           <View>
  //             <Shift />
  //             <Divider />
  //           </View>
  //         );
  //       })}
  //     </Layout>
  //   );
  // };

  // useEffect(() => {
  //   displayData(2);
  // });

  return (
    <Layout>
      <Text>press to see / edit</Text>
    </Layout>
  );
};

export default shiftTracker;

const styles = StyleSheet.create({});
