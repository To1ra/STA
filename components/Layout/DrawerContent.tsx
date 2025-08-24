import { DrawerContentScrollView } from "@react-navigation/drawer";
import DrawerGroup from "../Drawer/DrawerGroup";
import DrawerItem from "../Drawer/DrawerItem";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Spacer from "../Spacer";
import React from "react";

interface DrawerContentProps {
  navigation: {
    closeDrawer: () => void;
  };
  [key: string]: any;
}

const DrawerContent: React.FC<DrawerContentProps> = React.memo((props) => {
  const router = useRouter();
  return (
    <DrawerContentScrollView {...props}>
      <Ionicons
        name="close-outline"
        size={50}
        onPress={() => props.navigation.closeDrawer()}
      />

      <View style={{ padding: "10%" }}>
        <DrawerItem label="Home" onPress={() => router.push("./")} />
        <DrawerItem
          label="All Shifts"
          onPress={() => router.push("./shiftTracker")}
        />
        <DrawerItem
          label="New Shift"
          onPress={() => router.push("/NewShift")}
        />
        <Spacer space={23} />
        <DrawerGroup title="Salary Section">
          <DrawerItem
            label="Basic 1"
            onPress={() => router.push("/BasicSalary")}
          />
          <DrawerItem
            label="List "
            onPress={() => router.push("/ListWageRate")}
          />
          <DrawerItem label="check3" onPress={() => {}} />
        </DrawerGroup>
      </View>
    </DrawerContentScrollView>
  );
});

export default DrawerContent;

const styles = StyleSheet.create({});
