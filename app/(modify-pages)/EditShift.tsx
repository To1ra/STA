import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";

interface EditShiftProps {
  toEdit: string;
}

const EditShift: React.FC<EditShiftProps> = () => {
  const toEdit = useLocalSearchParams().toEdit;

  return (
    <View>
      {toEdit == "Shift Time" && <Text>Hi</Text>}
      {toEdit == "Taarif Table" && <Text>Hello</Text>}
      {toEdit == "Total Salary" && <Text>WOW</Text>}
    </View>
  );
};

export default EditShift;

const styles = StyleSheet.create({});
