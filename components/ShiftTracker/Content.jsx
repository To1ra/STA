import { StyleSheet, View } from "react-native";
import Shift from "./Shift";
import { Divider, Layout, Text } from "@ui-kitten/components";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

const Content = ({ month, year }) => {
  const [output, setOutput] = useState([]);
  const db = useSQLiteContext();

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
      {output.map((row, index) => {
        return (
          <View key={index}>
            <Shift data={row} db={db} />
          </View>
        );
      })}
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({});
