import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import DrawerItem from "../../components/Drawer/DrawerItem";
import Content from "../../components/ShiftTracker/Content";
import { SQLiteProvider } from "expo-sqlite";
import { months } from "../../constans/Constans";
import { Ionicons } from "@expo/vector-icons";
import Spacer from "../../components/Spacer";
import NavigationBar from "../../components/NavigationBar";

const currentM = new Date().getMonth();
const currentY = new Date().getFullYear();

const shiftTracker: React.FC = () => {
  const [m, setMonth] = useState(currentM);
  const [y, setYear] = useState(currentY);
  const [modalVisible, setModalVisible] = useState(false);

  const drawerOnPress = (date: string) => {
    // setMonth(date.split(" ")[0]);
    // setYear(date.split(" ")[1]);
    // setModalVisible(false);
  };

  // const displayDrawerItems = (): React.ReactElement[] => {
  //   try {
  //     const startingYear = Number(y) - 1;
  //     const endYear = Number(y) + 1;

  //     // Create a flat array of all month-year combinations
  //     const monthYearCombinations = [];

  //     for (let year = startingYear; year <= endYear; year++) {
  //       for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
  //         const title = months[monthIndex] + " " + year;

  //         // Stop at current month + 1 for the end year
  //         if (year === endYear && monthIndex > currentM) break;

  //         monthYearCombinations.push({
  //           title,
  //           monthIndex,
  //           year,
  //           isCurrentSelection: monthIndex === currentM && year === Number(y)
  //         });
  //       }
  //     }

  //     // Map the flat array to JSX elements
  //     return monthYearCombinations.map((item, index) => (
  //       <DrawerItem
  //         key={index}
  //         label={item.title}
  //         onPress={() => drawerOnPress(item.title)}
  //         accessoryRight={
  //           item.isCurrentSelection ? (
  //             <Ionicons size={15} name="checkmark-outline" />
  //           ) : undefined
  //         }
  //       />
  //     ));

  //   } catch (err) {
  //     console.log(err);
  //     return [];
  //   }
  // };

  const nextMonth = () => {
    if (m == 11) {
      setMonth(0);
      setYear(y + 1);
    } else {
      setMonth(m + 1);
    }
  };

  const prevMonth = () => {
    if (m === 0) {
      setMonth(11);
      setYear(Number(y) - 1);
    } else {
      setMonth(m - 1);
    }
  };

  const display = () => {
    // if (Number(y) % 100 === 0) return m + " " + y;
    // return m + " " + y.slice(-2);
  };

  return (
    <View style={{ backgroundColor: "#161616", height: "100%" }}>
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
            {/* <Ionicons
                name="caret-down-outline"
                size={25}
                style={{ color: "white", marginRight: 8 }}
              />
              <Text style={{ color: "white", fontSize: 25 }}>{display()}</Text> */}
          </TouchableOpacity>
        }
      />
      {/* <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalBackdrop}>
              <TouchableWithoutFeedback>
                <View style={styles.model}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {displayDrawerItems()}
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal> */}
      <Spacer />
      <Content month={m} year={Number(y)} />
      <Spacer />
      <Spacer />
      <Spacer />
    </View>
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
