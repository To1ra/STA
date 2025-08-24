import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";

interface DrawerItemProps {
  label: string;
  onPress: () => void;
  accessoryRight?: React.ReactElement;
  key?: string | number;
}

const DrawerItem: React.FC<DrawerItemProps> = React.memo(({ label, onPress, accessoryRight, ...props }) => {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={styles.title}>{label}</Text>
      {accessoryRight && (
        <View style={styles.accessoryContainer}>
          {accessoryRight}
        </View>
      )}
    </TouchableOpacity>
  );
});

export default DrawerItem;

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E4E9F2",
  },
  title: {
    fontSize: 16,
    color: "#222B45",
    flex: 1,
  },
  accessoryContainer: {
    marginLeft: 8,
  },
});