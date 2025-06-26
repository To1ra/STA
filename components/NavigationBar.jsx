import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Layout } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";

const NavigationBar = ({
  forward,
  backward,
  showState,
  showRight = true,
  showLeft = true,
}) => {
  return (
    <Layout style={styles.monthBar}>
      <View style={styles.side}>
        {showLeft ? (
          <Ionicons
            onPress={backward}
            size={35}
            name="arrow-back-outline"
            style={{ color: "white" }}
          />
        ) : null}
      </View>

      <View style={styles.center}>{showState}</View>

      <View style={styles.side}>
        {showRight ? (
          <Ionicons
            onPress={forward}
            size={35}
            name="arrow-forward-outline"
            style={{ color: "white" }}
          />
        ) : null}
      </View>
    </Layout>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  monthBar: {
    width: "80%",
    alignSelf: "center",
    height: 50,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center", // ✅ aligns children vertically
    justifyContent: "space-between",
    backgroundColor: "#2c334f",
  },

  side: {
    width: 50,
    height: "100%", // ✅ match height of parent (optional)
    alignItems: "center",
    justifyContent: "center", // ✅ center icon vertically
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // ✅ center text vertically
    height: "100%", // ✅ match height of parent
  },
});
