import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";

interface ContainerProps {
  title?: string;
  icon?: string;
  data?: ReactNode;
}

const Container: React.FC<ContainerProps> = React.memo(({
  title = "hola",
  icon = "american-football-outline",
  data = <></>,
}) => {
  return (
    <View
      style={{ paddingHorizontal: "5%", width: "95%", alignSelf: "center" }}
    >
      <View style={styles.div}>
        <View
          style={[
            { flexDirection: "row", alignItems: "center" },
            styles.element,
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          {icon && <Ionicons name={icon as any} size={15} style={{ marginLeft: 4 }} />}
        </View>

        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.data}>{data}</View>
    </View>
  );
});

export default Container;

const styles = StyleSheet.create({
  editButton: {
    height: 24,
    paddingHorizontal: 6,
    paddingVertical: 0,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#E4E9F2",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 12,
    color: "#8F9BB3",
  },
  title: {
    fontSize: 15,
    lineHeight: 24,
  },
  data: {
    alignSelf: "center",
  },
  element: {
    alignSelf: "center",
    marginLeft: 10,
  },
  button: {
    height: 24,
    paddingHorizontal: 8,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  div: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
  },
});