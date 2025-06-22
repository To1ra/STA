import React, { Suspense, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Layout, Text, Spinner, Drawer } from "@ui-kitten/components";
import DrawerItem from "../../components/Drawer/DrawerItem";

import Content from "../../components/ShiftTracker/Content";
import { SQLiteProvider } from "expo-sqlite";
import { months } from "../../constans/Constans";
import { Ionicons } from "@expo/vector-icons";
import Spacer from "../../components/Spacer";
import NavigationBar from "../../components/NavigationBar";

const currentM = new Date().getMonth();
const currentY = new Date().getFullYear();

const shiftTracker = () => {
  const [num, setNum] = useState(currentM);
  const [m, setMonth] = useState(months[currentM]);
  const [y, setYear] = useState("" + currentY);
  const [modalVisible, setModalVisible] = useState(false);

  const drawerOnPress = (date) => {
    setMonth(date.split(" ")[0]);
    setYear(date.split(" ")[1]);
    setModalVisible(false);
  };

  const displayDrawerItems = () => {
    let temp = currentM;
    let row = 0;
    const displayJSX = [];
    const startingYear = Number(y) - 1;
    const endYear = Number(y) + 1;
    for (let index = startingYear; index <= endYear; index++) {
      for (let i = 0; i < 12; i++) {
        const title = months[temp] + " " + index;
        if (temp === 11) {
          displayJSX.push(
            <DrawerItem
              key={row}
              label={title}
              onPress={() => drawerOnPress(title)}
            />
          );
          temp = 0;
          break;
        } else if (temp === currentM + 1 && index === endYear) break;
        else if (temp === currentM && index === Number(y)) {
          displayJSX.push(
            <DrawerItem
              key={row}
              label={title}
              onPress={() => drawerOnPress(title)}
              accessoryRight={<Ionicons size={15} name="checkmark-outline" />}
            />
          );
        } else
          displayJSX.push(
            <DrawerItem
              key={row}
              label={title}
              onPress={() => drawerOnPress(title)}
            />
          );

        temp++;
        row++;
      }
    }
    return displayJSX;
  };

  const nextMonth = () => {
    if (num === 11) {
      setNum(0);
      setMonth(months[0]);
      setYear(String(Number(y) + 1));
    } else {
      setNum(num + 1);
      setMonth(months[num + 1]);
    }
  };

  const prevMonth = () => {
    if (num === 0) {
      setNum(11);
      setMonth(months[11]);
      setYear(String(Number(y) - 1));
    } else {
      setNum(num - 1);
      setMonth(months[num - 1]);
    }
  };

  const display = () => {
    if (Number(y) % 100 === 0) return m + " " + y;
    return m + " " + y[2] + y[3];
  };

  return (
    <Layout style={{ backgroundColor: "#161616", height: "100%" }}>
      <Suspense fallback={<Spinner size="giant" />}>
        <Spacer />
        <NavigationBar
          forward={nextMonth}
          backward={prevMonth}
          showState={
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Ionicons
                name="caret-down-outline"
                size={25}
                style={{ color: "white", marginRight: 8 }}
              />
              <Text style={{ color: "white", fontSize: 25 }}>{display()}</Text>
            </TouchableOpacity>
          }
        />

        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalBackdrop}>
              <TouchableWithoutFeedback>
                <View style={styles.model}>
                  <Drawer onSelect={() => {}}>{displayDrawerItems()}</Drawer>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Spacer />
        <SQLiteProvider databaseName="myDataBase">
          <ScrollView>
            <Content month={months.indexOf(m)} year={Number(y)} />
          </ScrollView>
        </SQLiteProvider>
      </Suspense>
    </Layout>
  );
};

export default shiftTracker;

const styles = StyleSheet.create({
  model: {
    width: "50%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: "12%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
