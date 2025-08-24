import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface SpacerProps {
  space?: number;
}

const Spacer: React.FC<SpacerProps> = React.memo(({ space = 10 }) => {
  return <View style={{ marginBottom: space }} />;
});
export default Spacer;
