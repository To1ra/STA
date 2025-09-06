import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, StyleSheet, StatusBar } from "react-native";
import Header from "../../components/Layout/Header";
import DrawerContent from "../../components/Layout/DrawerContent";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Redirect, useRouter } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import React from "react";

// ✅ Set initial page
export const unstable_settings = {
  initialRouteName: "shiftTracker",
};

const RootLayout: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRouter();
  StatusBar.setBarStyle("light-content", true);

  return (
    <SQLiteProvider databaseName="myDataBase">
      <View
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
      </View>
    </SQLiteProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
