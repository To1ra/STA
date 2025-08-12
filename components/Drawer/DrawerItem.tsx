import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DrawerItem as DI } from "@react-navigation/drawer";
import React from "react";

interface DrawerItemProps {
  [key: string]: any;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ ...props }) => {
  return (
    <TouchableOpacity>
      <DI {...props} />
    </TouchableOpacity>
  );
};

export default DrawerItem;

const styles = StyleSheet.create({});
