import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MenuItem } from "@ui-kitten/components";
import React from "react";

interface DrawerItemProps {
  label: string;
  onPress: () => void;
  accessoryRight?: React.ReactElement;
  key?: string | number;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ label, onPress, accessoryRight, ...props }) => {
  return (
    <MenuItem
      title={label}
      onPress={onPress}
      accessoryRight={accessoryRight}
      {...props}
    />
  );
};

export default DrawerItem;

const styles = StyleSheet.create({});
