import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Touchable, TouchableOpacity } from "react-native";
import { BlurView } from "@react-native-community/blur";

const NoteCard = ({ subtitle, color, onPress }) => {
    return(
    <TouchableOpacity style={styles.cardWrapper} onPress={onPress}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType='ultraThinMaterialDark'
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View style={{position: 'absolute', right: 10, top: 10, width: 10, height: 10, borderRadius: 99, backgroundColor: color, overflow: 'hidden',     borderColor: "rgba(255, 255, 255, 0.5)",borderWidth: 1,}}/>
      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 80,
  },
  cardWrapper: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    width: "48%",
    overflow: "hidden",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
  },
  notebookLabel: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 22,
    color: "#ddd",
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    color: "#888",
    alignSelf: "flex-end",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#8a2be2",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
    lineHeight: 34,
  },
});


export default NoteCard;