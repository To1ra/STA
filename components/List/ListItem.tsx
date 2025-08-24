import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ListItemData {
  id: string | number;
  name: string;
  startDate: string;
  startHour: string;
  endDate: string;
  endHour: string;
  rate: string;
}

interface ListItemProps {
  data: ListItemData;
  editRoute: string;
}

const ListItem: React.FC<ListItemProps> = React.memo(({ data, editRoute }) => {
  const router = useRouter();

  const editItem = () => {
    router.push({
      pathname: editRoute,
      params: { id: data["id"] },
    });
  };
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
      <Button title="edit" onPress={() => editItem()} />
    </View>
  );
});

export default ListItem;

const styles = StyleSheet.create({
  bigTitle: {
    fontSize: 20,
  },

  item: {
    borderRadius: "20",
    backgroundColor: "grey",
    margin: "auto",
  },
});
