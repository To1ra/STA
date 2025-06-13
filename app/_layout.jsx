import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, StyleSheet, StatusBar } from "react-native";
import Header from "../components/Layout/Header"; // adjust path as needed
import DrawerContent from "../components/Layout/DrawerContent"; // adjust path as needed
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";

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
        backgroundColor: "#161616",
      }}
    >
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <Drawer
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            header: ({ route, navigation, options }) => (
              <Header
                title={options.drawerLabel ?? options.title ?? route.name}
                navigation={navigation}
              />
            ),
          }}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
