import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import ListItem from "../../components/List/ListItem";
import { Ionicons } from "@expo/vector-icons";

const WageRate = () => {
  const db = useSQLiteContext();
  const [output, setOutput] = useState([]);
  const [vis, setVis] = useState(false);

  const delRecord = async (id) => {
    try {
      await db.execAsync("DELETE FROM WAGE_RATES  WHERE id=" + id + ";");
      setVis(false);
      await myFetch();
    } catch (err) {
      console.log(err);
    }
  };
  const myFetch = async () => {
    try {
      const allRows = await db.getAllAsync("SELECT * FROM WAGE_RATES");
      setOutput(allRows);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    myFetch();
    console.log("hey");
  }, []);

  return (
    <View>
      <View>
        <FlatList
          data={output}
          renderItem={({ item }) => (
            <>
              <ListItem data={item} editRoute={"WageRate"} />
              {vis ? (
                <Ionicons
                  name="remove-circle-sharp"
                  size={15}
                  onPress={() => delRecord(item["id"])}
                />
              ) : null}
            </>
          )}
          key={(item) => item["id"]}
        />
        <Ionicons
          name="trash-outline"
          size={30}
          onPress={() => setVis(!vis)}
          style={{ alignSelf: "flex-end" }}
        />
      </View>
    </View>
  );
};

export default WageRate;

const styles = StyleSheet.create({});
