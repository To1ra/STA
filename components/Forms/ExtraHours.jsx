import { StyleSheet, Text, View, TextInput } from "react-native";
import Container from "./Container";
import { useState, useEffect } from "react";
import { useSubmit } from "../../Context/FormSubmitContext";
import * as SecureStore from "expo-secure-store";

const ExtraHours = ({ init }) => {
  const submitGeneral = useSubmit();

  const [moreHours, setMoreHours] = useState("8");
  const [first, setFirst] = useState("125");
  const [last, setLast] = useState("150");

  async function getInit() {
    const res1 = await SecureStore.getItemAsync("moreHours");
    const res2 = await SecureStore.getItemAsync("first");
    const res3 = await SecureStore.getItemAsync("last");

    setMoreHours(res1);
    setFirst(res2);
    setLast(res3);
  }

  async function getInitTable() {
    //from SQL
    const res1 = await SecureStore.getItemAsync("moreHours");
    const res2 = await SecureStore.getItemAsync("first");
    const res3 = await SecureStore.getItemAsync("last");

    setMoreHours(res1);
    setFirst(res2);
    setLast(res3);
  }

  useEffect(() => {
    if (!init) getInit();
    else getInitTable();
  }, []);

  return (
    <View>
      <Container
        title="Extra Hours count from"
        style={{
          alignSelf: "center",
        }}
      >
        <TextInput
          style={[styles.inp, { width: "50%" }]}
          keyboardType="numeric"
          onChangeText={(num) => submitGeneral(num, "moreHours", setMoreHours)}
          value={moreHours}
          maxLength={10} //setting limit of input
        />
      </Container>
      <View
        style={{
          flexDirection: "row-reverse",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text>After 2 First Hours</Text>
        <TextInput
          style={[styles.inp, { width: "50%" }]}
          keyboardType="numeric"
          onChangeText={(num) => submitGeneral(num, "first", setFirst)}
          value={first}
          maxLength={10} //setting limit of input
        />
      </View>
      <View
        style={{
          flexDirection: "row-reverse",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text>Later Hours</Text>
        <TextInput
          style={[styles.inp, { width: "50%" }]}
          keyboardType="numeric"
          onChangeText={(num) => submitGeneral(num, "last", setLast)}
          value={last}
          maxLength={10} //setting limit of input
        />
      </View>
    </View>
  );
};

export default ExtraHours;

const styles = StyleSheet.create({
  inp: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
