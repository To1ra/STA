import { StyleSheet, Text, View } from "react-native";
import { Spinner } from "@ui-kitten/components";
import React, { useState, Suspense, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import NavigationBar from "../../components/NavigationBar";
import Container from "../../components/ShowShift/Container";
import Spacer from "../../components/Spacer";
import * as SQLite from "expo-sqlite";

const normalRepresentation = (toNormal) => {
  const formattedDate = toNormal.toISOString().split("T")[0]; // "2025-06-19"
  const [year, month, day] = formattedDate.split("-");
  const flippedDate = `${day}/${month}/${year}`;
  return flippedDate;
};

const ShowShift = () => {
  const data = useLocalSearchParams();
  const currentShiftDate = new Date(
    data["yearDate"],
    data["monthDate"],
    data["dayDate"]
  );
  const [date, setDate] = useState(currentShiftDate);
  const [showRight, setShowRight] = useState(true);
  const [showLeft, setshowLeft] = useState(true);

  useEffect(() => {
    navUpdate();
  }, []);

  const navUpdate = async () => {
    const db = await SQLite.openDatabaseAsync("myDataBase");

    const temp1 = await db.getAllAsync(
      `SELECT COUNT (*) FROM ALL_SHIFTS WHERE monthDate=${data["monthDate"]} AND yearDate = ${data["yearDate"]} AND dayDate >= ${data["dayDate"]};`
    );
    const temp2 = await db.getAllAsync(
      `SELECT COUNT (*) FROM ALL_SHIFTS WHERE monthDate=${data["monthDate"]} AND yearDate = ${data["yearDate"]}`
    );
    const res1 = temp1[0]["COUNT (*)"];
    const res2 = temp2[0]["COUNT (*)"];
    if (res1 == 1) setshowRight(false);
    if (res2 == res1) setShowLeft(false);
  };

  const nextDate = () => {
    currentShiftDate.setDate(date.getDate() + 1);
    setDate(currentShiftDate);
  };
  const prevDate = () => {
    currentShiftDate.setDate(date.getDate() - 1);
    setDate(currentShiftDate);
  };

  const showHours = () => {};

  const showTime = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{data["totalHours"] + "\n" + "Hours Worked"} </Text>
        <Text> {data["startTime"] + "\n" + "Started"} </Text>
        <Text> - </Text>
        <Text> {data["endTime"] + "\n" + "Ended"} </Text>
      </View>
    );
  };

  return (
    <View>
      <Spacer space={25} />
      <NavigationBar
        showState={
          <Text
            style={{
              color: "white",
              fontSize: "17",
            }}
          >
            {normalRepresentation(date)}
          </Text>
        }
        backward={prevDate}
        forward={nextDate}
        showRight={showRight}
        showLeft={showLeft}
      />
      <Spacer space={25} />
      <Container title="" icon="" data={showTime()} />
      <Spacer space={25} />
      <Container title="" icon="" />
      <Spacer space={25} />
      <Container title="" icon="" />
      <Spacer space={25} />
      <Container title="" icon="" />
    </View>
  );
};

export default ShowShift;

const styles = StyleSheet.create({});
