import { StyleSheet, Text, View, TextInput } from "react-native";
import Container from "./Container";
import { useState, useEffect } from "react";
import { useSubmit } from "../../Context/FormSubmitContext";
import * as SecureStore from "expo-secure-store";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";

interface InnerProps {
  id?: string | number;
}

const ExtraHours: React.FC<InnerProps> = React.memo(({ id }) => {
  const submitGeneral = useSubmit();
  const db = useSQLiteContext();

  const [moreHours, setMoreHours] = useState("8");
  const [first, setFirst] = useState("125");
  const [last, setLast] = useState("150");

  async function getInit() {
    try {
      const res1 = await SecureStore.getItemAsync("moreHours");
      const res2 = await SecureStore.getItemAsync("first");
      const res3 = await SecureStore.getItemAsync("last");

      submitGeneral(
        (res1 || "0").toString(),
        "extraHoursCountFrom",
        setMoreHours
      );
      submitGeneral((res2 || "0").toString(), "firstRate", setFirst);
      submitGeneral((res3 || "0").toString(), "lastRate", setLast);
    } catch (err) {
      console.log(err);
    }
  }

  async function getInitTable() {
    try {
      //from SQL
      if (!id) return;

      const rows = await db.getAllAsync(
        `SELECT extraHoursCountFrom, firstRate, lastRate FROM ALL_SHIFTS WHERE id = ${id}`
      );

      if (rows.length > 0) {
        const row = rows[0] as any;
        const { extraHoursCountFrom, firstRate, lastRate } = row;

        submitGeneral(
          extraHoursCountFrom?.toString() || "0",
          "extraHoursCountFrom",
          setMoreHours
        );
        submitGeneral(firstRate?.toString() || "0", "firstRate", setFirst);
        submitGeneral(lastRate?.toString() || "0", "lastRate", setLast);
      }
    } catch (err) {
      console.log("Error in getInitTable:", err);
    }
  }

  useEffect(() => {
    if (!id) getInit();
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
          onChangeText={(num) =>
            submitGeneral(num, "extraHoursCountFrom", setMoreHours)
          }
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
          onChangeText={(num) => submitGeneral(num, "firstRate", setFirst)}
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
          onChangeText={(num) => submitGeneral(num, "lastRate", setLast)}
          value={last}
          maxLength={10} //setting limit of input
        />
      </View>
    </View>
  );
});

export default ExtraHours;

const styles = StyleSheet.create({
  inp: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
