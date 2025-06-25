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
const temp = days.map((item) => "Every " + item);

const WageRate = ({ init }) => {
  const ref = useSharedRef();

  const submitGeneral = useSubmit();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startHour, setStartHour] = useState(new Date());
  const [endHour, setEndHour] = useState(new Date());
  const [rate, setRate] = useState("150");

  useEffect(() => {
    if (!init) {
      ref.current["Table"] = "WAGE_RATES";
      ref.current["startHour"] = startHour
        .toString()
        .split(" ")[4]
        .split(":00")[0];
      ref.current["endHour"] = endHour.toString().split(" ")[4].split(":00")[0];
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
                selected={startDate}
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
                selected={endDate}
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
              keyboardType="numeric"
              onChangeText={(num) => submitGeneral(num, "rate", setRate)}
              value={rate}
              maxLength={15} //setting limit of input
            />
          </Container>
          <ExtraHours />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default WageRate;
const styles = StyleSheet.create({
  title: { textAlign: "right", paddingHorizontal: "10", fontWeight: "bold" },
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
