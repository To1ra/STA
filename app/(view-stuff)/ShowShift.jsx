import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import NavigationBar from "../../components/NavigationBar";
import Container from "../../components/ShowShift/Container";
import Spacer from "../../components/Spacer";

const ShowShift = () => {
  const data = useLocalSearchParams();
  const [date, setDate] = useState(null);
  console.log(data);
  return (
    <View>
      <Spacer space={25} />
      <Container />
      <Spacer space={25} />
      <Container />
      <Spacer space={25} />
      <Container />
      <Spacer space={25} />

      <Container />
    </View>
  );
};

export default ShowShift;

const styles = StyleSheet.create({});
