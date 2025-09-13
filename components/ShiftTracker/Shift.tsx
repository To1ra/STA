import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { months, days } from "../../constans/Constans";
import AreYouSure from "../AreYouSure";
import { useState } from "react";
import { useRouter } from "expo-router";
import React from "react";
import { setShiftData } from "../../utils/Storage/wantedShift";
import { ShiftData } from "../../utils/types";
import { formatTime, displayTime } from "../../utils/TestFunctions";

interface ShiftProps {
  data: ShiftData;
  del: (id: string | number) => void;
}

const Shift: React.FC<ShiftProps> = React.memo(({ data, del }) => {
  const [vis, setVis] = useState(false);
  const router = useRouter();

  const dateObj = new Date(
    data["yearDate"],
    data["monthDate"],
    data["dayDate"]
  );
  const theActualDay = dateObj.getDay();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/ShowShift`);
        setShiftData(data);
      }}
    >
      <View style={styles.shift}>
        <AreYouSure action={() => del(data["id"])} vis={vis} setVis={setVis} />

        <View style={styles.dateSection}>
          <Text style={styles.dateText}>{data["dayDate"]}</Text>
          <Text style={styles.dateText}>{months[data["monthDate"]]}</Text>
        </View>

        {/* Location & Time Section */}
        <View style={styles.middleSection}>
          <Text style={styles.locationText}>
            {days[theActualDay] + " " + data["newDay"]}
          </Text>
          <Text style={styles.timeText}>
            {formatTime(data["startTime"])} - {formatTime(data["endTime"])}
          </Text>
        </View>

        {/* Hours Worked */}
        <View style={styles.hoursSection}>
          <Text style={styles.hoursText}>{displayTime(data.hoursWorked)}</Text>
          <Text style={styles.labelText}>Hours Worked</Text>
        </View>

        {/* Action Icons */}
        <TouchableOpacity onPress={() => setVis(true)}>
          <View style={styles.iconsSection}>
            <Ionicons
              name="trash-outline"
              size={30}
              color="white"
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

export default Shift;

const styles = StyleSheet.create({
  shift: {
    backgroundColor: "#292929",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    marginVertical: 5,
    marginBottom: 12,
  },
  dateSection: {
    alignItems: "center",
  },
  dateText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  middleSection: {
    paddingHorizontal: 10,
    marginLeft: 25,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "white",
  },

  locationText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  timeText: {
    color: "#CCCCCC",
    fontSize: 14,
  },
  hoursSection: {
    alignItems: "center",
    marginRight: 10,
  },
  hoursText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  labelText: {
    color: "#CCCCCC",
    fontSize: 12,
  },
  iconsSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 5,
  },
});
