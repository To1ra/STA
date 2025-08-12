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
import Container from "../../components/Forms/Container";
import * as SecureStore from "expo-secure-store";
import Spacer from "../../components/Spacer";
import ExtraHours from "../../components/Forms/ExtraHours";
import { useSubmit } from "../../Context/FormSubmitContext";

const BasicSalary: React.FC = () => {
  const submitGeneral = useSubmit();

  useEffect(() => {
    getInit();
  }, []);

  async function getInit() {
    const res1 = await SecureStore.getItemAsync("HW");
    const res2 = await SecureStore.getItemAsync("bus");
    const res3 = await SecureStore.getItemAsync("breakTime");

    setHW(res1);
    setBus(res2);
    setBreakTime(res3);
  }

  const [HW, setHW] = useState("0");
  const [bus, setBus] = useState("0");
  const [breakTime, setBreakTime] = useState("0");
  const [vis, setVis] = useState(false);

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ height: "100%" }}>
          <Spacer />
          <Spacer />
          <Container title="Hourly wage - NIS">
            <TextInput
              style={styles.inp}
              keyboardType="numeric"
              onChangeText={(num) => submitGeneral(num, "HW", setHW)}
              value={HW}
              maxLength={10} //setting limit of input
            />
          </Container>
          <Spacer />
          <Spacer />
          <Container title="Buses - NIS">
            <TextInput
              style={styles.inp}
              keyboardType="numeric"
              onChangeText={(num) => submitGeneral(num, "bus", setBus)}
              value={bus}
              maxLength={10} //setting limit of input
            />
          </Container>
          <Spacer />
          <Spacer />
          <Container title="Reduce Break Time">
            <Button onPress={() => setVis(!vis)} title="Wanta fanta?" />
          </Container>
          {vis ? (
            <Container title="Reduce Break Time">
              <TextInput
                style={styles.inp}
                keyboardType="numeric"
                onChangeText={(num) =>
                  submitGeneral(num, "breakTime", setBreakTime)
                }
                value={breakTime}
                maxLength={10} //setting limit of input
              />
            </Container>
          ) : null}
          <Spacer />
          <Spacer />
          <Spacer />
          <ExtraHours />
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
