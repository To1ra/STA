import { StyleSheet, Text, View, TextInput } from "react-native";
import Container from "./Container";
import { useState, useEffect } from "react";
import { useSubmit } from "../../Context/FormSubmitContext";
import * as SecureStore from "expo-secure-store";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

const ExtraHours = ({ init, id }) => {
  return (
    <SQLiteProvider databaseName="myDataBase">
      <Inner init={init} id={id} />
    </SQLiteProvider>
  );
};

const Inner = ({ init, id }) => {
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

      submitGeneral(res1.toString(), "extraHoursCountFrom", setMoreHours);
      submitGeneral(res2.toString(), "firstRate", setFirst);
      submitGeneral(res3.toString(), "lastRate", setLast);
    } catch (err) {
      console.log(err);
    }
  }

  async function getInitTable() {
    //from SQL
    const rows = await db.getAllAsync(
      `SELECT extraHoursCountFrom, firstRate, lastRate FROM ${init} WHERE id = ${id}`
    );

    if (rows.length > 0) {
      const { extraHoursCountFrom, firstRate, lastRate } = rows[0];

      submitGeneral(
        extraHoursCountFrom?.toString(),
        "extraHoursCountFrom",
        setMoreHours
      );
      submitGeneral(firstRate?.toString(), "firstRate", setFirst);
      submitGeneral(lastRate?.toString(), "lastRate", setLast);
    }
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
