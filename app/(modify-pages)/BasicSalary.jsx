import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import * as SecureStore from "expo-secure-store";
import { useSharedRef } from "../../Context/FormContext";
import Spacer from "../../components/Spacer";

const BasicSalary = () => {
  const Ref = useSharedRef();

  useEffect(() => {
    getInit();
  }, []);

  async function getInit() {
    const res1 = await SecureStore.getItemAsync("HW");
    const res2 = await SecureStore.getItemAsync("HW");
    Ref.current["Table"] = "I d K ";
    setHW(res1);
    setBus(res2);
  }

  const submitHW = (num) => {
    Ref.current["HW"] = num;
    setHW(num);
  };

  const submitBus = (num) => {
    Ref.current["Bus"] = num;
    setBus(num);
  };

  const submitBreak = (num) => {
    Ref.current["Break"] = num;
    setHafsaka(num);
  };

  const submitFirst = (num) => {
    Ref.current["First"] = num;
    setFirst(num);
  };
  const submitLater = (num) => {
    Ref.current["Later"] = num;
    setLater(num);
  };

  const [hw, setHW] = useState();
  const [bus, setBus] = useState();
  const [hafsaka, setHafsaka] = useState(0);
  const [first, setFirst] = useState("120");
  const [later, setLater] = useState("150");
  const [vis, setVis] = useState(false);
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ height: "100%" }}>
          <Spacer />
          <Spacer />
          <Container title="Hourly wage - NIS">
            <TextInput
              style={styles.inp}
              keyboardType="numeric"
              onChangeText={(num) => submitHW(num)}
              value={hw}
              maxLength={10} //setting limit of input
            />
          </Container>
          <Spacer />
          <Spacer />
          <Container title="Buses - NIS">
            <TextInput
              style={styles.inp}
              keyboardType="numeric"
              onChangeText={(num) => submitBus(num)}
              value={bus}
              maxLength={10} //setting limit of input
            />
          </Container>
          <Spacer />
          <Spacer />
          <Container title="Reduce Break Time">
            <Button onPress={() => setVis(!vis)} title="Wanta fanta?" />
          </Container>
          {vis && (
            <Container title="Reduce Break Time">
              <TextInput
                style={styles.inp}
                keyboardType="numeric"
                onChangeText={(num) => submitBreak(num)}
                value={hafsaka}
                maxLength={10} //setting limit of input
              />
            </Container>
          )}
          <Spacer />
          <Spacer />
          <Spacer />

          <Container
            title="Extra Hours"
            style={{
              alignSelf: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text>After 2 First Hours</Text>
              <TextInput
                style={[styles.inp, { width: "50%" }]}
                keyboardType="numeric"
                onChangeText={(num) => submitFirst(num)}
                value={first}
                maxLength={10} //setting limit of input
              />
            </View>
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text>Later Hours</Text>
              <TextInput
                style={[styles.inp, { width: "50%" }]}
                keyboardType="numeric"
                onChangeText={(num) => submitLater(num)}
                value={later}
                maxLength={10} //setting limit of input
              />
            </View>
          </Container>
          <Spacer />
          <Spacer />
          <Spacer />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default BasicSalary;

const styles = StyleSheet.create({
  inp: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
