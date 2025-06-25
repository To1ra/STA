import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const ListItem = ({ data }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.bigTitle}>{data["name"]}</Text>
      <Text>
        {"\n" +
          data["startDate"] +
          " " +
          data["startHour"] +
          " till " +
          data["endDate"] +
          " " +
          data["endHour"]}
      </Text>
      <Text>{data["rate"]}</Text>
      <Button title="edit" />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  bigTitle: {
    fontSize: "20",
  },

  item: {
    borderRadius: "20",
    backgroundColor: "grey",
    margin: "auto",
  },
});
