import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DrawerItem as DI } from "@react-navigation/drawer";

const DrawerItem = ({ styling, ...props }) => {
  return (
    <TouchableOpacity>
      <DI {...props} />
    </TouchableOpacity>
  );
};

export default DrawerItem;

const styles = StyleSheet.create({});
