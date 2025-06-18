import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
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
import LogoutSvg from '../assets/svg/LogoutSvg'
import Video from 'react-native-video';
import {AuthContext} from '../context/AuthContext'
import getUserFromToken from '../tools/getUserFromToken'
import { getNotes } from "../api/notesApi";

export default function HomeScreen() {
  const { logout } = useContext(AuthContext);
    const [selectedNote, setSelectedNote] = useState(null);
    const scaleAnim = useState(new Animated.Value(0.8))[0];
    const [modalVisible, setModalVisible] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [userEmail, setUserEmail] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
      const fetchUser = async () => {
        const user = await getUserFromToken();
        // if (user) {
          setUserEmail(user.email)
        // }
      };
    
      fetchUser();
    }, []);

    const loadNotes = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getNotes(); 
        console.log('response: ', response);
        setNotes(response);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, []);
    
    useLayoutEffect(() => {
      loadNotes();
    }, [loadNotes]);
    
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
        setModalVisible(false);
        setSelectedNote(null);
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
      setCreateModalVisible(false);
        };

  return (
    <View
      style={styles.background}
    >
      <Video
        source={{uri:'https://res.cloudinary.com/dhwub37bf/video/upload/hxjs2o3fpvzx4wt6q3fl.mp4'}} 
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        repeat
        muted
        playWhenInactive
        playInBackground
        ignoreSilentSwitch="obey"
      />
        <FlatList
          showsVerticalScrollIndicator={false}
            data={notes}
            numColumns={2}
            ListHeaderComponent={()=>(
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 20,marginTop: 80,paddingVertical: 30, padding: 18, zIndex: 99, alignSelf: 'center', borderRadius: 20, overflow: 'hidden',   borderColor: "rgba(255, 255, 255, 0.3)", borderWidth: 0}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{fontSize: 24, color: "#ddd", fontFamily: 'Nunito'}}>{userEmail}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {logout()}}>
                          <LogoutSvg width={30} height={30}/>
                        </TouchableOpacity>
                    </View>
            )}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item, index }) => (
              <NoteCard
                  key={index}
                  subtitle={item.content}
                  onPress={() => openModal(item)}
              />
            )}
        />
         {!loading && notes.length === 0 && <Text style={{color: "#ddd", position: 'absolute', fontSize: 18}}>Nothing here</Text>}
        <TouchableOpacity style={styles.addButton} onPress={() => openCreateModal()}>
            <BlurView 
                style={StyleSheet.absoluteFill}
                blurType='ultraThinMaterialDark'
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            />
            <AddSvg/>
        </TouchableOpacity>
        <ModalNote onRefresh={loadNotes} modalVisible={modalVisible} selectedNote={selectedNote} closeModal={closeModal}/>
        <ModalCreateNote onRefresh={loadNotes} modalVisible={createModalVisible} closeModal={closeCreateModal}/>
    </View>
  );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#000',
        paddingHorizontal: 12,
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
