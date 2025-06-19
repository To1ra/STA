import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
          title="All Shifts"
          label="All Shifts"
          onPress={() => router.push("./shiftTracker")}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const showFolderPages = () => {
  return;
};

export default DrawerContent;

const styles = StyleSheet.create({});
