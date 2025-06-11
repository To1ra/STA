import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, StyleSheet, StatusBar } from "react-native";
import Header from "../components/Layout/Header"; // adjust path as needed
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
//arrow function

const RootLayout = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  StatusBar.setBarStyle("light-content", true);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        // paddingBottom: insets.bottom,
        backgroundColor: "#6200ee",
      }}
    >
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <Drawer
          screenOptions={{
            header: ({ route, navigation }) => (
              <Header title={route.name} navigation={navigation} />
            ),
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Home",
              title: "Home",
            }}
          />
          <Drawer.Screen
            name="shiftTracker"
            options={{
              drawerLabel: "User",
              title: "All Shifts",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
