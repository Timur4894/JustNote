import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import CopySvg from "../assets/svg/CopySvg";
import DeleteSvg from "../assets/svg/DeleteSvg";
import { deleteNote, editNote } from "../api/notesApi";

const ModalNote = ({ onRefresh, modalVisible, selectedNote, closeModal }) => {
  const scaleAnim = useState(new Animated.Value(0.8))[0];
  const [noteText, setNoteText] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [showTagPicker, setShowTagPicker] = useState(false);
  const tagAnim = useRef(new Animated.Value(0)).current;
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (modalVisible && selectedNote) {
      setNoteText(selectedNote.content);
      setOriginalText(selectedNote.content); 
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
      Animated.timing(tagAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowTagPicker(false));
    });
  };

  const toggleTagPicker = () => {
    if (showTagPicker) {
      Animated.timing(tagAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowTagPicker(false));
    } else {
      setShowTagPicker(true);
      Animated.timing(tagAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);

      await deleteNote(selectedNote._id);
      onRefresh();
      handleClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    Clipboard.setString(noteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditNote = async () => {
    try {
      setLoading(true);
      setError(null);

      await editNote(selectedNote._id, noteText);
      onRefresh();
      handleClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
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

        {noteText !== originalText && (
          <TouchableOpacity
            style={{ position: "absolute", top: 80, right: 20, zIndex: 99, }}
            onPress={handleEditNote}
          >
            <Text style={{ fontSize: 28, color: "#ddd", fontFamily: 'Nunito' }}>Save</Text>
          </TouchableOpacity>
        )}

        {copied && (
          <View style={styles.copiedToast}>
            <Text style={styles.copiedText}>Text copied</Text>
          </View>
        )}

        <Pressable style={{ flex: 1 }} onPress={handleClose} />
        {/* <TouchableOpacity onPress={toggleTagPicker} style={{position: 'absolute', left: 20, top: 80, width: 30, height: 30, borderRadius: 99 , overflow: 'hidden', borderColor: "rgba(255, 255, 255, 0.5)",borderWidth: 1,alignItems: 'center', backgroundColor: selectedColor ? selectedColor : null}}>
        </TouchableOpacity> */}
        <Animated.View
          style={[styles.modalCard, { transform: [{ scale: scaleAnim }] }]}
        >
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

        <TouchableOpacity
          style={{ position: "absolute", bottom: 50, left: 40 }}
          onPress={handleDelete}
        >
          <DeleteSvg width={30} height={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ position: "absolute", bottom: 50, right: 40 }}
          onPress={handleCopy}
        >
          <CopySvg width={30} height={30} />
        </TouchableOpacity>
      </View>
      {showTagPicker && (
        <Animated.View
          style={[
            styles.colorPickerContainer,
            {
              opacity: tagAnim,
              transform: [
                {
                  scale: tagAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            },
          ]}
        >
          {['transparent', "#f1c40f", "#e67e22", "#2ecc71", "#9b59b6", "#3498db"].map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedColor(color)
                Animated.timing(tagAnim, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: true,
                }).start(() => setShowTagPicker(false));
              }}
              style={[
                styles.colorCircle,
                { backgroundColor: color, borderWidth: selectedColor === color ? 2 : 1 },
              ]}
            />
          ))}
        </Animated.View>
      )}

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
    paddingBottom: 16,
    overflow: "hidden",
  },
  colorPickerContainer: {
    position: "absolute",
    top: 130,
    left: 20,
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: "rgba(255,255,255,0.3)",
  },
  
  modalTextInput: {
    fontSize: 22,
    fontFamily: 'Nunito',
    color: "#fff",
    textAlignVertical: "top",
  },
  copiedToast: {
    position: "absolute",
    top: 100,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  copiedText: {
    color: "#ddd",
    fontFamily: 'Nunito',
    fontSize: 18,
  },
});

export default ModalNote;
