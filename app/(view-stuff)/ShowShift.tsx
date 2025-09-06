import { StyleSheet, Text, View } from "react-native";
import React, { useState, Suspense, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import NavigationBar from "../../components/NavigationBar";
import Container from "../../components/ShowShift/Container";
import Spacer from "../../components/Spacer";
import { getShiftData } from "../../utils/Storage/wantedShift";
import { ShiftData } from "../../utils/types";
import { formatTime } from "../../utils/TestFunctions";
import { get } from "http";

const normalRepresentation = (toNormal: Date): string => {
  const formattedDate = toNormal.toISOString().split("T")[0]; // "2025-06-19"
  const [year, month, day] = formattedDate.split("-");
  const flippedDate = `${day}/${month}/${year}`;
  return flippedDate;
};

const ShowShift: React.FC<{ data: ShiftData }> = () => {
  let data = getShiftData(); //Load from local storage
  if (!data) return <Text>No Data</Text>;

  const currentShiftDate = new Date(
    Number(data["yearDate"]),
    Number(data["monthDate"]),
    Number(data["dayDate"])
  );
  const [date, setDate] = useState(currentShiftDate);
  const [showRight, setShowRight] = useState(true);
  const [showLeft, setshowLeft] = useState(true);

  useEffect(() => {
    navUpdate();
  }, []);

  const navUpdate = async () => {};

  const nextDate = () => {};

  const prevDate = () => {};

  return (
    <View>
      <Spacer space={25} />
      <NavigationBar
        showState={
          <Text
            style={{
              color: "white",
              fontSize: 17,
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
      <Container
        title="Shift Time"
        icon=""
        data={
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.label}>Hours Worked</Text>
              <Text style={styles.value}>{data.totalHours}</Text>
            </View>

            <View style={styles.cell}>
              <Text style={styles.label}>Started</Text>
              <Text style={styles.value}>{formatTime(data.startTime)}</Text>
            </View>

            <View style={[styles.cell, { alignItems: "center" }]}>
              <Text style={styles.value}>-</Text>
            </View>

            <View style={styles.cell}>
              <Text style={styles.label}>Ended</Text>
              <Text style={styles.value}>{formatTime(data.endTime)}</Text>
            </View>
          </View>
        }
      />
      <Spacer space={25} />
      <Container
        title="Taarif Table"
        icon=""
        data={
          <View>
            {/* Header */}
            <View style={styles.row2}>
              <Text style={styles.cell2}>Type</Text>
              <Text style={styles.cell2}>Taarif</Text>
              <Text style={styles.cell2}>Hours</Text>
            </View>

            {/* Data */}
            {data.allShiftRates.split(",").map((str, index) => {
              const val = str.split("-");
              return (
                <View style={styles.row2} key={index}>
                  <Text style={styles.cell2}>Soon</Text>
                  <Text style={styles.cell2}>{val[1]}</Text>
                  <Text style={styles.cell2}>{val[0]}</Text>
                </View>
              );
            })}
          </View>
        }
      />
      <Spacer space={25} />
      <Container
        title="Total Salary"
        icon=""
        data={
          <View>
            <Text>{data.totalSalary}</Text>
          </View>
        }
      />
      <Spacer space={25} />
      <Container title="" icon="" />
    </View>
  );
};

export default ShowShift;

const styles = StyleSheet.create({
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250, // fixed width keeps it compact like your original design
    marginVertical: 2, // small spacing between rows
  },
  cell2: {
    width: 80, // each column has fixed width to align like a table
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300, // or any fixed width to keep compact
    marginVertical: 4,
  },
  cell: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
