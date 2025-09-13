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

  const drawerOnPress = (date: string) => {};

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

  const display = () => {};

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
            <Text style={{ color: "white", fontSize: 25 }}>
              {months[m] + " " + y}
            </Text>
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
