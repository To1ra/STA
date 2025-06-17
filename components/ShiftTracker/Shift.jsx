import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { months, days } from "../../constans/Constans";

const Shift = ({ data }) => {
  {
    /*  Change it later*/
  }
  const dateString = data["date"];
  const [day, month, year] = dateString.split("/").map(Number);
  const dateObj = new Date(year, month - 1, day); // month is 0-indexed
  const theActualDay = dateObj.getDay();

  return (
    <Layout style={styles.shift}>
      {/* Date Section */}
      <View style={styles.dateSection}>
        <Text style={styles.dateText}>{data["date"].split("/")[0]}</Text>
        <Text style={styles.dateText}>
          {months[data["date"].split("/")[1]]}
        </Text>
      </View>

      {/* Location & Time Section */}
      <View style={styles.middleSection}>
        <Text style={styles.locationText}>{days[theActualDay]}</Text>
        <Text style={styles.timeText}>
          {data["startTime"]} - {data["endTime"]}
        </Text>
      </View>

      {/* Hours Worked */}
      <View style={styles.hoursSection}>
        <Text style={styles.hoursText}>{data["totalHours"]}</Text>
        <Text style={styles.labelText}>Hours Worked</Text>
      </View>

      {/* Action Icons */}
      <View style={styles.iconsSection}>
        <Ionicons
          name="trash-outline"
          size={30}
          color="white"
          style={styles.icon}
        />
      </View>
    </Layout>
  );
};

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
    marginBottom: "12",
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
    borderLeftWidth: "2",
    borderRightWidth: "2",
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
