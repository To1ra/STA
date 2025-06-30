import { StyleSheet, View, FlatList } from "react-native";
import Shift from "./Shift";
import { Divider, Layout, Text } from "@ui-kitten/components";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

const Content = ({ month, year }) => {
  const [output, setOutput] = useState([]);
  const db = useSQLiteContext();

  const del = async (id) => {
    await db.execAsync("DELETE FROM ALL_SHIFTS WHERE id =" + id + ";");
    console.log("hey");
    await myFetch();
  };

  const myFetch = async () => {
    try {
      const allRows = await db.getAllAsync(
        "SELECT * FROM All_SHIFTS WHERE monthDate=" +
          month +
          " AND YearDate=" +
          year
      );
      setOutput(allRows);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    myFetch();
  }, [month, year]);
  return (
    <View>
      <FlatList
        data={output}
        renderItem={({ item }) => <Shift data={item} del={del} />}
        keyExtractor={(item) => item["id"]}
      />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({});
