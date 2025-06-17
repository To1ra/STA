import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, StyleSheet, StatusBar } from "react-native";
import Header from "../components/Layout/Header";
import DrawerContent from "../components/Layout/DrawerContent";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as eva from "@eva-design/eva";
import { Redirect } from "expo-router";

import { ApplicationProvider, Layout } from "@ui-kitten/components";

// ✅ Set initial page
export const unstable_settings = {
  initialRouteName: "shiftTracker",
};

const RootLayout = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  StatusBar.setBarStyle("light-content", true);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Redirect href="./shiftTracker" />
      <Layout
        style={{
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: "#161616",
        }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
              header: ({ route, navigation, options }) => (
                <Header title={route.name} navigation={navigation} />
              ),
            }}
          />
        </GestureHandlerRootView>
      </Layout>
    </ApplicationProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
