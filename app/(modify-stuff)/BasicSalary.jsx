import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Layout } from "@ui-kitten/components";
import Container from "../../components/Container";
import * as SecureStore from "expo-secure-store";

const BasicSalary = () => {
  useEffect(() => {
    getInit();
  }, []);

  async function getInit() {
    const res = await SecureStore.getItemAsync("HW");
    setHW(res);
  }

  const [hw, setHW] = useState();
  return (
    <Layout>
      <Container title="Hourly wage - NIS">
        <TextInput
          style={styles.inp}
          keyboardType="numeric"
          onChangeText={setHW}
          value={hw}
          maxLength={10} //setting limit of input
        />
      </Container>
    </Layout>
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
