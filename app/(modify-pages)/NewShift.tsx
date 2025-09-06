import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/Forms/Container";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSubmit } from "../../Context/FormSubmitContext";
import { useSharedRef } from "../../Context/FormContext";
import { nextDaySelector } from "../../utils/TestFunctions";
import ShiftTimeSelector from "../../components/Forms/ShiftTimeSelector";

const NewShift: React.FC = () => {
  const ref = useSharedRef();
  const [date, setDate] = useState(new Date());
  const temo = new Date(date);
  temo.setDate(temo.getDate() + 1);
  const [date2, setDate2] = useState(temo);
  const [startHour, setStartHour] = useState(new Date());
  const [endHour, setEndHour] = useState(new Date());
  const submitGeneral = useSubmit();

  useEffect(() => {
    ref.current["Table"] = "ALL_SHIFTS";
    ref.current["rate"] = 100;
  }, []);

  useEffect(() => {
    // If it's *not* next day, run submitGeneral automatically
    if (!nextDaySelector(startHour, endHour)) {
      submitGeneral(date, "dateEnd", setDate2);
    }
  }, [startHour, endHour, date]);

  return (
    <View>
      <ShiftTimeSelector status={false} />
      {/* <Container title="Notes">
        <TextInput
          value={note}
          style={styles.inp}
          maxLength={100}
          onChangeText={(text) => submitGeneral(text, "note", setNote)}
        />
      </Container> */}
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
