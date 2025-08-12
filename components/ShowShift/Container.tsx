import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { Layout, Button } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";

interface ContainerProps {
  title?: string;
  icon?: string;
  data?: ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  title = "hola",
  icon = "american-football-outline",
  data = <></>,
}) => {
  return (
    <Layout
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
          <Ionicons name={icon} size={15} style={{ marginLeft: 4 }} />
        </View>

        <Button
          appearance="outline" // or "ghost" or "filled", depending on your desired look
          size="small"
          style={styles.editButton}
        >
          {() => <Text style={styles.title}>Edit</Text>}
        </Button>
      </View>

      <View style={styles.data}>{data}</View>
    </Layout>
  );
};

export default Container;

const styles = StyleSheet.create({
  editButton: {
    height: 24, // match the line height of the text
    paddingHorizontal: 6,
    paddingVertical: 0,
    minWidth: undefined, // prevent extra width from size="small"
    alignSelf: "center",
  },
  title: {
    fontSize: 15,
    lineHeight: 24, // important to match height
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
