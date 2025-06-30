import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import Container from "../../components/Forms/Container";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSubmit } from "../../Context/FormSubmitContext";
const NewShift = () => {
  const [date, setDate] = useState(new Date());
  const [startHour, setStartHour] = useState(new Date());
  const [endHour, setEndHour] = useState(new Date());
  const [note, setNote] = useState("");

  const submitGeneral = useSubmit();

  return (
    <View>
      <Container title="Pick The Date">
        <DateTimePicker
          value={date}
          mode={"date"}
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              submitGeneral(selectedDate, "date", setDate);
            }
          }}
        />
      </Container>
      <Container title="Start Time">
        <DateTimePicker
          value={startHour}
          mode={"time"}
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              submitGeneral(selectedDate, "startHour", setStartHour);
            }
          }}
        />
      </Container>
      <Container title="End Time">
        <DateTimePicker
          value={endHour}
          mode={"time"}
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              submitGeneral(selectedDate, "endHour", setEndHour);
            }
          }}
        />
      </Container>
      <Container title="Notes">
        <TextInput
          value={note}
          style={styles.inp}
          maxLength={100}
          onChangeText={(text) => submitGeneral(text, "note", setNote)}
        />
      </Container>
    </View>
  );
};

export default NewShift;

const styles = StyleSheet.create({
  inp: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
