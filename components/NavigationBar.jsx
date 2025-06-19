import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Layout } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";

const NavigationBar = ({ forward, backward, showState }) => {
  return (
    <Layout style={styles.monthBar}>
      <Ionicons
        onPress={backward}
        size={35}
        name="arrow-back-outline"
        style={{ color: "white" }}
      />
      {showState}
      <Ionicons
        onPress={forward}
        size={35}
        name="arrow-forward-outline"
        style={{ color: "white" }}
      />
    </Layout>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  monthBar: {
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    height: 50,
    borderRadius: 8,
    flexDirection: "row",
    backgroundColor: "#2c334f",
  },
});
