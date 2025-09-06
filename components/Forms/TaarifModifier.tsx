import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import ExtraHours from "./ExtraHours";
import { useSubmit } from "../../Context/FormSubmitContext";
import { useSQLiteContext } from "expo-sqlite";
import { getShiftData } from "../../utils/Storage/wantedShift";
import { useSharedRef } from "../../Context/FormContext";
const TaarifModifier = () => {
  const data = getShiftData();
  if (data === null) return <Text>NO DATA</Text>;

  const [vis, setVis] = useState(false);
  const submitGeneral = useSubmit();
  const [rate, setRate] = useState(data.rate);
  const ref = useSharedRef();

  const db = useSQLiteContext();

  useEffect(() => {
    ref.current["Table"] = "ALL_SHIFTS";
    ref.current["edit"] = "yes";
    ref.current["id"] = data.id;
  });

  return (
    <View>
      <Container title="Reduce Break Time">
        <TextInput
          style={[styles.inp, { width: "50%" }]}
          keyboardType="numeric"
          onChangeText={(num) => submitGeneral(num, "rate", setRate)}
          value={"" + rate}
          maxLength={10} //setting limit of input
        />
      </Container>
      <Container title="Reduce Break Time">
        <Button onPress={() => setVis(!vis)} title="Extra Horus" />
      </Container>
      {vis ? <ExtraHours id={data.id} /> : null}
    </View>
  );
};

export default TaarifModifier;

const styles = StyleSheet.create({
  inp: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
