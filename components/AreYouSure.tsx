import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface AreYouSureProps {
  action: () => void;
  vis: boolean;
  setVis: (visible: boolean) => void;
}

const AreYouSure: React.FC<AreYouSureProps> = React.memo(({ action, vis, setVis }) => {
  return (
    <Modal
      visible={vis}
      transparent={true}
      onRequestClose={() => setVis(false)}
    >
      <TouchableWithoutFeedback onPress={() => setVis(false)}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setVis(false)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="close-outline"
                  size={25}
                  color="#666"
                />
              </TouchableOpacity>
              
              <Text style={styles.questionText}>Are you sure</Text>
              
              <TouchableOpacity
                style={styles.yesButton}
                onPress={() => {
                  setVis(false);
                  action();
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.yesButtonText}>YES</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

export default AreYouSure;

const styles = StyleSheet.create({
  modal: {
    width: "25%",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  yesButton: {
    backgroundColor: "#3366FF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  yesButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});