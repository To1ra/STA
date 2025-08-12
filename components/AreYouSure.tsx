import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";
import React from "react";

interface AreYouSureProps {
  action: () => void;
  vis: boolean;
  setVis: (visible: boolean) => void;
}

const AreYouSure: React.FC<AreYouSureProps> = ({ action, vis, setVis }) => {
  return (
    <Modal
      style={styles.modal}
      visible={vis}
      transparent={true}
      onRequestClose={() => setVis(false)}
    >
      <TouchableWithoutFeedback onPress={() => setVis(false)}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Ionicons
                name="close-outline"
                size={25}
                onPress={() => setVis(false)}
              />
              <Text>Are you sure</Text>
              <Button
                size="large"
                onPress={() => {
                  setVis(false);
                  action();
                }}
              >
                YES
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AreYouSure;

const styles = StyleSheet.create({
  modal: {
    width: "25%",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",

    color: "white",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
