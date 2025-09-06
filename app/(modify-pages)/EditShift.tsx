import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import ShiftTimeSelector from "../../components/Forms/ShiftTimeSelector";
import TaarifModifier from "../../components/Forms/TaarifModifier";
import { getShiftData } from "../../utils/Storage/wantedShift";

interface EditShiftProps {
  toEdit: string;
}

const EditShift: React.FC<EditShiftProps> = () => {
  const toEdit = useLocalSearchParams().toEdit;

  return (
    <View>
      {toEdit == "Shift Time" && <ShiftTimeSelector status={true} />}
      {toEdit == "Taarif Table" && <TaarifModifier />}
      {toEdit == "Total Salary" && <Text>WOW</Text>}
    </View>
  );
};

export default EditShift;

const styles = StyleSheet.create({});
