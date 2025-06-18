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
import SaveSvg from '../assets/svg/SaveSvg'
import { createNote } from "../api/notesApi";

const ModalCreateNote = ({ onRefresh, modalVisible, closeModal }) => {
  const scaleAnim = useState(new Animated.Value(0.8))[0];
  const [noteText, setNoteText] = useState("");
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (modalVisible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  const handleCreateNote = async (content) => {
    try {
      setLoading(true);
      setError(null);
  
      await createNote(content);
      await onRefresh()
      setNoteText("");
      closeModal();
    } catch (e) {
      setError(e.message); 
    } finally {
      setLoading(false);
    }
  };

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
        {error && <Text style={{position: 'absolute', top: 100, color: "red", fontSize: 22,fontFamily: 'Nunito', alignSelf: 'center', textAlign: 'center', fontWeight: "700", width: '90%', marginTop: 12}}>
          {error}
        </Text>}
        <TouchableOpacity style={{position: 'absolute', bottom: 50, right: 40}} onPress={()=>{handleCreateNote(noteText)}}>
            <Text style={{fontSize: 28,
            fontFamily: 'Nunito',
    color: "#ddd",}}>Save</Text>
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
    fontFamily: 'Nunito'
  },
});

export default ModalCreateNote;
