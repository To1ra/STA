import { Modal, StyleSheet, View } from "react-native";
import {
  Layout,
  Text,
  Spinner,
  Drawer,
  DrawerItem,
  Modal,
} from "@ui-kitten/components";
import { Suspense, useEffect, useState } from "react";
import Content from "../components/ShiftTracker/Content";
import { SQLiteProvider } from "expo-sqlite";
import { months } from "../constans/Constans";
import { Ionicons } from "@expo/vector-icons";
import Spacer from "../components/Spacer";

const currentM = new Date().getMonth();
const currentY = new Date().getFullYear();
const data = new Array(8).fill({
  title: "Item",
});

const shiftTracker = () => {
  const [num, setNum] = useState(currentM);
  const [m, setMonth] = useState(months[currentM]);
  const [y, setYear] = useState("" + currentY);
  const [visibilityState, setvisibility] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const nextMonth = () => {
    if (num == 11) {
      setNum(0);
      setMonth(months[0]);
      setYear(String(Number(y) + 1));
    } else {
      setNum(num + 1);
      setMonth(months[num + 1]);
    }
    return;
  };
  const prevMonth = () => {
    if (num == 0) {
      setNum(11);
      setMonth(months[11]);
      setYear(String(Number(y) - 1));
    } else {
      setNum(num - 1);
      setMonth(months[num - 1]);
    }
    return;
  };
  const display = () => {
    if (Number(y) % 100 == 0) return m + " " + y;
    return m + " " + y[2] + y[3];
  };
  const setDateWithIcon = () => {
    setvisibility(true);
  };
  return (
    <Layout style={{ backgroundColor: "#161616", height: "100%" }}>
      <Suspense fallback={<Spinner size="giant" />}>
        <Spacer />
        <Layout style={styles.monthBar}>
          <Ionicons
            onPress={prevMonth}
            size={35}
            name="arrow-back-outline"
            style={{
              color: "white",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Ionicons
              onPress={setDateWithIcon}
              name="caret-down-outline"
              size={25}
              style={{ color: "white" }}
            />
            <Modal visible={visibilityState} backdropStyle>
              <Drawer
                selectedIndex={selectedIndex}
                onSelect={(index) => setSelectedIndex(index)}
              >
                <DrawerItem title="Users" />
                <DrawerItem title="Orders" />
                <DrawerItem title="Transactions" />
                <DrawerItem title="Settings" />
              </Drawer>
            </Modal>

            <Text style={{ color: "white", fontSize: 25 }}>{display()}</Text>
          </View>
          <Ionicons
            onPress={nextMonth}
            size={35}
            name="arrow-forward-outline"
            style={{ color: "white" }}
          />
        </Layout>
        <Spacer />
        <SQLiteProvider databaseName="myDataBase">
          <Content />
        </SQLiteProvider>
      </Suspense>
    </Layout>
  );
};

export default shiftTracker;

const styles = StyleSheet.create({
  monthBar: {
    display: "flex",
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    height: "5%",
    borderRadius: "2%",
    flexDirection: "row",
    backgroundColor: "#2c334f",
  },
});
