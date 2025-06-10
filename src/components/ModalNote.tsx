import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Modal,
  Pressable,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import CopySvg from '../assets/svg/CopySvg'
import DeleteSvg from '../assets/svg/DeleteSvg'

const ModalNote = ({ modalVisible, selectedNote, closeModal }) => {
  const scaleAnim = useState(new Animated.Value(0.8))[0];
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (modalVisible && selectedNote?.subtitle) {
      setNoteText(selectedNote.subtitle);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, selectedNote]);

  const handleClose = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.8,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      closeModal();
    });
  };

  return (
    <Modal transparent visible={modalVisible} animationType="fade">
      <View style={StyleSheet.absoluteFill}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="ultraThinMaterialDark"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
    
        <Pressable style={{ flex: 1 }} onPress={handleClose} />

        <Animated.View style={[styles.modalCard, { transform: [{ scale: scaleAnim }] }]}>
          <TextInput
            style={styles.modalTextInput}
            value={noteText}
            onChangeText={setNoteText}
            multiline
            placeholder="Type your note..."
            placeholderTextColor="#aaa"
          />
        </Animated.View>
        <TouchableOpacity style={{position: 'absolute', bottom: 50, left: 40}}>
            <DeleteSvg width={30} height={30}/>
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'absolute', bottom: 50, right: 40}}>
            <CopySvg width={30} height={30}/>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalCard: {
    position: "absolute",
    top: "30%",
    left: "5%",
    right: "5%",
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    paddingBottom: 20,
    overflow: "hidden",
  },
  modalTextInput: {
    fontSize: 22,
    color: "#fff",
    textAlignVertical: "top",
  },
});

export default ModalNote;
