import { StyleSheet, Text, View, TextInput } from "react-native";
import ExtraHours from "../../components/Forms/ExtraHours";
import React, { useState } from "react";
import Spacer from "../Spacer";
import { useSubmit } from "../../Context/FormSubmitContext";

const EditLocalTaarif = () => {
  const [normalRate, setNormalRate] = useState("100");
  const submitGeneral = useSubmit();

  return (
    <View>
      <Text>editLocalTaarif</Text>
      <TextInput
        style={[styles.inp, { width: "50%" }]}
        keyboardType="numeric"
        onChangeText={(num) => submitGeneral(num, "normalRate", setNormalRate)}
        value={normalRate}
        maxLength={10} //setting limit of input
      />
      <Spacer />
      <ExtraHours />
    </View>
  );
};

export default EditLocalTaarif;
const styles = StyleSheet.create({
  inp: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
