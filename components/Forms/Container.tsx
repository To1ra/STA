import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import Spacer from "../Spacer";

interface ContainerProps {
  title: string;
  children: ReactNode;
  style?: ViewStyle;
}

const Container: React.FC<ContainerProps> = React.memo(({ title, children, style }) => {
  return (
    <View style={{ justifyContent: "center" }}>
      <Text style={{ textAlign: "right", padding: 10 }}>{title}</Text>
      <Spacer />
      <View style={style}>{children}</View>
      <Spacer />
      <Spacer />
    </View>
  );
});

export default Container;

const styles = StyleSheet.create({});
