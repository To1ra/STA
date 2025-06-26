import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

const DrawerGroup = ({ title, children }) => {
  const [vis, setVis] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setVis(!vis)}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {vis ? <View>{children}</View> : null}
    </View>
  );
};

export default DrawerGroup;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 12,
    color: "#333",
  },
  children: {
    paddingLeft: 16,
    paddingBottom: 8,
  },
});
