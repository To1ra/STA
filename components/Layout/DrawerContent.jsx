import { DrawerContentScrollView } from "@react-navigation/drawer";
import DrawerGroup from "../Drawer/DrawerGroup";
import DrawerItem from "../Drawer/DrawerItem";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Spacer from "../Spacer";
const DrawerContent = (props) => {
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
        <Spacer space={23} />
        <DrawerGroup title="Salary Section">
          <DrawerItem
            label="Basic 1"
            onPress={() => router.push("(modify-pages)/BasicSalary")}
          />
          <DrawerItem label="check2" />
          <DrawerItem label="check3" />
        </DrawerGroup>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({});
