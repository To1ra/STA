import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import React, { useEffect, useState } from "react";
import Container from "../../components/Forms/Container";
import ExtraHours from "../../components/Forms/ExtraHours";
import { useSubmit } from "../../Context/FormSubmitContext";
import Spacer from "../../components/Spacer";
import DrawerMenuSelector from "../../components/DrawerMenuSelector";
import { days } from "../../constans/Constans";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSharedRef } from "../../Context/FormContext";
import * as SQLite from "expo-sqlite";
import { getTodayWithTime, isEmpty } from "../../utils/TestFunctions";
import { useLocalSearchParams } from "expo-router";

const temp = days.map((item) => "Every " + item);

const WageRate: React.FC = () => {
  const ref = useSharedRef();
  const { id } = useLocalSearchParams();
  const submitGeneral = useSubmit();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startHour, setStartHour] = useState(new Date());
  const [endHour, setEndHour] = useState(new Date());
  const [rate, setRate] = useState("150");
  let table = null;

  //FIX FUNCTION
  const fetchSql = async () => {
    const db = await SQLite.openDatabaseAsync("myDataBase");

    try {
      console.log("entering fetchsql");
      console.log(id);
      const dbRecordVALUES = await db.getAllAsync(
        `SELECT * FROM WAGE_RATES WHERE id = ${id}`
      );

      let data = dbRecordVALUES[0] as any;
      console.log(data);

      if (data && typeof data === "object") {
        for (const field in data) {
          if (ref.current) {
            ref.current[field] = data[field];
          }
        }
      }

      if (ref.current) {
        submitGeneral(ref.current["name"] || "", "name", setName);
        submitGeneral(
          days[ref.current["startDate"]] || 0,
          "startDate",
          setStartDate
        );
        submitGeneral(days[ref.current["endDate"]] || 0, "endDate", setEndDate);
        submitGeneral(ref.current["rate"]?.toString() || "0", "rate", setRate);

        if (ref.current["startHour"]) {
          submitGeneral(
            getTodayWithTime(ref.current["startHour"]),
            "startHour",
            setStartHour
          );
        }
        if (ref.current["endHour"]) {
          submitGeneral(
            getTodayWithTime(ref.current["endHour"]),
            "endHour",
            setEndHour
          );
        }
      }

      console.log(ref.current);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    ref.current["Table"] = "WAGE_RATES";
    console.log(ref.current);
    console.log(id);
    if (!id) {
      ref.current["startHour"] = startHour.toString();
      ref.current["endHour"] = endHour.toString();
      ref.current["rate"] = rate;
      submitGeneral(rate, "rate", setRate);
      submitGeneral(endHour, "endHour", setEndHour);
      submitGeneral(startHour, "startHour", setStartHour);
    } else {
      ref.current["edit"] = "yes";
      table = "WAGE_RATES";
      fetchSql();
    }
  }, []);
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <Container title="name">
            <TextInput
              style={styles.inp}
              onChangeText={(text) => submitGeneral(text, "name", setName)}
              value={name}
              maxLength={15} //setting limit of input
            />
          </Container>
          <Container title="Time">
            <Spacer />
            <Text style={styles.title}> Start</Text>
            <View style={styles.row}>
              <Text>Day</Text>
              <DrawerMenuSelector
                data={temp}
                selected={parseInt(startDate) || 0}
                setSelected={setStartDate}
                fieldName={"startDate"}
              />
              <Text>Hour</Text>
              <DateTimePicker
                value={startHour}
                mode={"time"}
                onChange={(event, selectedDate) => {
                  if (selectedDate)
                    submitGeneral(selectedDate, "startHour", setStartHour);
                }}
              />
            </View>

            <Spacer />

            <Text style={styles.title}>End</Text>
            <View style={styles.row}>
              <Text>Day</Text>
              <DrawerMenuSelector
                data={temp}
                selected={parseInt(endDate) || 0}
                setSelected={setEndDate}
                fieldName={"endDate"}
              />
              <Text>Hour</Text>
              <DateTimePicker
                value={endHour}
                mode={"time"}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    submitGeneral(selectedDate, "endHour", setEndHour);
                  }
                }}
              />
            </View>
          </Container>
          <Container title="rate">
            <TextInput
              style={styles.inp}
              onChangeText={(num) => submitGeneral(num, "rate", setRate)}
              value={rate}
              maxLength={15}
            />
          </Container>
          <ExtraHours id={id ? String(id) : undefined} />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default WageRate;

const styles = StyleSheet.create({
  title: { textAlign: "right", paddingHorizontal: 10, fontWeight: "bold" },
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-around",
  },
  inp: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
