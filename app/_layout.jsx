import { StyleSheet, Text, View } from "react-native";
import Header from "../components/layout/Header";
import { useEffect, useState } from "react";
import { useSegments } from "expo-router";

const RootLayout = () => {
  const segments = useSegments();
  const [title, setTitle] = useState("Default");

  useEffect(() => {
    const currentRoute = segments[segments.length - 1] || "index";

    const titles = {
      index: "Home",
      shiftTracker: "All Shifts",
    };

    setTitle(titles[currentRoute] || "App");
  }, [segments]);

  return (
    <View style={{ flex: 1 }}>
      <Header title={title} />
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
