import { Drawer } from "expo-router/drawer";
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, StyleSheet, StatusBar } from "react-native";
import Header from "../components/Layout/Header"; // adjust path as needed
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

//arrow function

const RootLayout = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  StatusBar.setBarStyle("light-content", true);

  return (
    <>
  
 <ApplicationProvider {...eva} theme={eva.light}>
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
          screenOptions={{
            header: ({ route, navigation, options }) => (
              <Header title={options.title} navigation={navigation} />
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
           <Drawer.Screen
            name="addshift"
            options={{
              drawerLabel: "AddShift",
              title: "Add A Shift",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </View>
    </ApplicationProvider>
    </>        

  );
};

export default RootLayout;

const styles = StyleSheet.create({});
