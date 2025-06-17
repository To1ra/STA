import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";

const Shift = (data, specs) => {
  return (
    <Layout style={styles.shift}>
      {/* Date Section */}
      <View style={styles.dateSection}>
        <Text style={styles.dateText}>21</Text>
        <Text style={styles.dateText}>Jan</Text>
      </View>

      {/* Location & Time Section */}
      <View style={styles.middleSection}>
        <Text style={styles.locationText}>Time</Text>
        <Text style={styles.timeText}>5:00 PM - 11:00 PM</Text>
      </View>

      {/* Hours Worked */}
      <View style={styles.hoursSection}>
        <Text style={styles.hoursText}>6</Text>
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
    backgroundColor: "#282828",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  dateSection: {
    alignItems: "center",
    marginRight: 10,
  },
  dateText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  middleSection: {
    flex: 1,
    paddingHorizontal: 10,
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
