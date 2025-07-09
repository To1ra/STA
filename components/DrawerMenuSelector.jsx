import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import { useSubmit } from "../Context/FormSubmitContext";
import { days } from "../constans/Constans";

const DrawerMenuSelector = ({
  data,
  selected = null,
  fieldName = null,
  setSelected = null,
}) => {
  const [visible, setVisible] = useState(false);
  const submitGeneral = useSubmit();

  const handleSelect = (item) => {
    if (item.includes("Every")) item = item.split(" ")[1];

    const temp = days.indexOf(item).toString();
    setVisible(false);
    submitGeneral(temp, fieldName, setSelected);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.dropdownText}>{days[selected] || "Select"}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modal}>
            <FlatList
              data={data}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.checkmark}>
                    {selected === item ? "✓" : ""}
                  </Text>
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
  },
  dropdownText: {
    fontSize: 16,
    textAlign: "right",
  },
  backdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000066",
  },
  modal: {
    marginHorizontal: 30,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
  },
  item: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  checkmark: {
    width: 20,
    color: "black",
    marginLeft: 10,
  },
  itemText: {
    fontSize: 16,
    textAlign: "right",
    flex: 1,
  },
});

export default DrawerMenuSelector;
