import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  Modal,
  Pressable,
} from "react-native";
import NoteCard from '../components/NoteCard'
import { BlurView } from "@react-native-community/blur";
import ModalNote from '../components/ModalNote'
import ModalCreateNote from '../components/ModalCreateNote'
import AddSvg from '../assets/svg/AddSvg'

const notes = [
  {
    id: "1",
    subtitle: "The bike ride from Paris to Vernon is The bike ride from Paris to Vernon is The bike ride from Paris to Vernon is ",
    color: '#fff'
  },
  {
    id: "2",
    subtitle: "The bike ride from Paris to Vernon is...",
    color: 'red'
  },
  {
    id: "3",
    subtitle: "The bike ride from Paris to Vernon is...",
    color: 'green'
  },
  {
    id: "1",
    subtitle: "The bike ride from Paris to Vernon is The bike ride from Paris to Vernon is The bike ride from Paris to Vernon is ",
    color: '#fff'
  },
  {
    id: "2",
    subtitle: "The bike ride from Paris to Vernon is...",
    color: 'red'
  },
  {
    id: "3",
    subtitle: "The bike ride from Paris to Vernon is...",
    color: 'green'
  },
  {
    id: "1",
    subtitle: "The bike ride from Paris to Vernon is The bike ride from Paris to Vernon is The bike ride from Paris to Vernon is ",
    color: '#fff'
  },
  {
    id: "2",
    subtitle: "The bike ride from Paris to Vernon is...",
    color: 'red'
  },
  {
    id: "3",
    subtitle: "The bike ride from Paris to Vernon is...",
    color: 'green'
  },
  {
    id: "1",
    subtitle: "The bike ride from Paris to Vernon is The bike ride from Paris to Vernon is The bike ride from Paris to Vernon is ",
    color: '#fff'
  },
  {
    id: "2",
    subtitle: "The bike ride from Paris to Vernon is...",
    color: 'red'
  },
  {
    id: "3",
    subtitle: "The bike ride from Paris to Vernon is...",
    color: 'green'
  },
];



export default function HomeScreen() {
    const [selectedNote, setSelectedNote] = useState(null);
    const scaleAnim = useState(new Animated.Value(0.8))[0];
    const [modalVisible, setModalVisible] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);

    const openModal = (note) => {
        setSelectedNote(note);
        setModalVisible(true);
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 15,
          stiffness: 100,
        }).start();
      };

    const closeModal = () => {
        Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
            setSelectedNote(null);
        });
        };


    const openCreateModal = () => {
        setCreateModalVisible(true);
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            damping: 15,
            stiffness: 100,
        }).start();
    }

    const closeCreateModal = () => {
        Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            setCreateModalVisible(false);
        });
        };

  return (
    <ImageBackground
      source={require("../assets/imgs/background2.png")}
      style={styles.background}
    >
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',position: 'absolute', width: '98%', paddingVertical: 30, padding: 18, top: 80, zIndex: 99, alignSelf: 'center', borderRadius: 20, overflow: 'hidden',   borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,}}>
                <BlurView 
                    style={StyleSheet.absoluteFill}
                    blurType='chromeMaterialDark'
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                />
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 22, color: "#ccc", fontWeight: '800'}}>@TymurLatush</Text>
                    <Text style={{fontSize: 16, color: 'gray', fontWeight: '600'}}>timguy4894@gmail.com</Text>
                </View>
                <Text style={{fontSize: 20, color: '#ccc'}}>12 Notes</Text>
            </View>
        <FlatList
        showsVerticalScrollIndicator={false}
            data={notes}
            keyExtractor={(item) => item.id}
            numColumns={2}
            ListHeaderComponent={()=>(
                <View style={{marginTop: 210}}/>
            )}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item, index }) => (
            <NoteCard
                key={index}
                subtitle={item.subtitle}
                color={item.color}
                onPress={() => openModal(item)}
            />
            )}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => openCreateModal()}>
            <BlurView 
                style={StyleSheet.absoluteFill}
                blurType='ultraThinMaterialDark'
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            />
            <AddSvg/>
        </TouchableOpacity>
        </View>
        <ModalNote modalVisible={modalVisible} selectedNote={selectedNote} closeModal={closeModal}/>
        <ModalCreateNote modalVisible={createModalVisible} closeModal={closeCreateModal}/>
    
    </ImageBackground>
  );
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    width: "48%",
    overflow: "hidden",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#444",
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: "#888",
    alignSelf: "flex-end",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 40,
    overflow: 'hidden',
    width: 60,
    height: 60,
    borderRadius: 98,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: '900',
    fontSize: 40,
  },
  modalCard: {
    position: "absolute",
    top: "30%",
    left: "10%",
    right: "10%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    overflow: "hidden",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#ddd",
  },

});
