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

interface DrawerMenuSelectorProps {
  data: string[];
  selected?: number | null;
  fieldName?: string | null;
  setSelected?: ((value: any) => void) | null;
}

const DrawerMenuSelector: React.FC<DrawerMenuSelectorProps> = React.memo(({
  data,
  selected = null,
  fieldName = null,
  setSelected = null,
}) => {
  const [visible, setVisible] = useState(false);
  const submitGeneral = useSubmit();

  const handleSelect = (item: string) => {
    let parsed = item;
    if (parsed.includes("Every")) parsed = parsed.split(" ")[1];

    const tempIndex = days.indexOf(parsed); // number index
    const temp = tempIndex.toString();

    setVisible(false);

    if (fieldName && setSelected) {
      submitGeneral(temp, fieldName, setSelected);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.dropdownText}>{selected !== null ? days[selected] : "Select"}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modal}>
            <FlatList
              data={data}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                let parsed = item.includes("Every") ? item.split(" ")[1] : item;
                const itemIndex = days.indexOf(parsed);

                return (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.checkmark}>
                      {selected === itemIndex ? "✓" : ""}
                    </Text>
                    <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
});

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
