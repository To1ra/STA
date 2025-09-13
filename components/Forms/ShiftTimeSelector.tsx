import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSubmit } from "../../Context/FormSubmitContext";
import { useSharedRef } from "../../Context/FormContext";
import { nextDaySelector } from "../../utils/TestFunctions";
import { getShiftData } from "../../utils/Storage/wantedShift";

const ShiftTimeSelector: React.FC<{ status: boolean }> = React.memo(
  ({ status }) => {
    const ref = useSharedRef();
    const currentShift = getShiftData();
    const [date, setDate] = useState(new Date());

    const endDate = new Date(date); //to set inita  l date for next date picker
    endDate.setDate(endDate.getDate() + 1);

    const [date2, setDate2] = useState(endDate);
    const [startHour, setStartHour] = useState(new Date());
    const [endHour, setEndHour] = useState(new Date());
    const submitGeneral = useSubmit();

    useEffect(() => {
      ref.current["Table"] = "All_SHIFTS";
      if (status && currentShift) {
        ref.current["edit"] = "yes";
        ref.current["id"] = currentShift.id;
        submitGeneral(new Date(currentShift.startTime), "dateStart", setDate);
        submitGeneral(
          new Date(currentShift.startTime),
          "startTime",
          setStartHour
        );
        submitGeneral(new Date(currentShift.endTime), "endTime", setEndHour);
      } else {
        submitGeneral(date, "dateStart", setDate);
        submitGeneral(startHour, "startTime", setStartHour);
        submitGeneral(endHour, "endTime", setEndHour);
      }
    }, []);

    useEffect(() => {
      // If it's *not* next day, run submitGeneral automatically
      if (!nextDaySelector(startHour, endHour)) {
        submitGeneral(date, "dateEnd", setDate2);
      }
    }, [startHour, endHour, date]);

    return (
      <View>
        <Container title="Pick The Date">
          <DateTimePicker
            value={date}
            mode={"date"}
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                submitGeneral(selectedDate, "dateStart", setDate);
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
                submitGeneral(selectedDate, "startTime", setStartHour);
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
                submitGeneral(selectedDate, "endTime", setEndHour);
              }
            }}
          />
        </Container>

        {nextDaySelector(startHour, endHour) && (
          <Container title="Final Date">
            <DateTimePicker
              value={date2}
              mode="date"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  submitGeneral(selectedDate, "dateEnd", setDate2);
                }
              }}
            />
          </Container>
        )}
      </View>
    );
  }
);

export default ShiftTimeSelector;

const styles = StyleSheet.create({});
