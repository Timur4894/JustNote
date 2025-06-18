  import React, { use, useContext, useState } from "react";
  import { View, Text, StyleSheet, ImageBackground, Touchable, TouchableOpacity } from "react-native";
  import { BlurView } from "@react-native-community/blur";
  import CustomInputField from "../components/CustomInputField";
  import CustomButton from "../components/CustomButton";
  import { createUser } from '../api/userApi'
  import Video from 'react-native-video';
  import { flat } from "./react-native.config";
  import {AuthContext} from '../context/AuthContext'
  
  export default function RegisterScreen({navigation}) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
  
    const handleCreateUser = async () => {
      try {
        setLoading(true);
        setError(null);
    
        const token = await createUser({ email, password });
  
        if (token){
          login(token);
        }
    
        setEmail("");
        setPassword("");
      } catch (e) {
        setError(e.message); 
      } finally {
        setLoading(false);
      }
    };   
  
    return (
      <View style={styles.background}>
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
        <View style={styles.glassWrapper}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType='dark'
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          {/* <Text style={styles.header}>Just write. Instantly. <Text style={[styles.header, {color: '#2bc466'}]}>No fuss.</Text></Text> */}
          <Text style={styles.subHeader}><Text style={[styles.subHeader, {color: '#2bc466'}]}>Manage your notes</Text> across all your devices.
          </Text>
          <CustomInputField
            placeholder="Email"
            value={email}
            boxStyles={{marginBottom: 14}}
            onChangeText={setEmail}
          />
          <CustomInputField
            placeholder="Password"
            boxStyles={{}}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity disabled={loading} onPress={handleCreateUser} style={{marginTop: 12}}>
              <Text style={[{fontSize: 22, color: '#2bc466',fontFamily: 'Nunito', fontWeight: 'bold'}, loading && {color: '#aaa'}]}>
                  Create user
              </Text>
          </TouchableOpacity>
          <Text style={styles.footer}>
            Already have an account? <TouchableOpacity onPress={()=>{navigation.replace('Login')}} style={{}}><Text style={styles.register}>Login now</Text></TouchableOpacity>
          </Text>
        </View>
        <Text style={{color: "red", fontSize: 22,fontFamily: 'Nunito', alignSelf: 'center', textAlign: 'center', fontWeight: "700", width: '90%', marginTop: 12}}>{error}</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: "center",
      alignItems: "center",
    },
    glassWrapper: {
      width: "85%",
      padding: 25,
      paddingVertical: 40,
      borderRadius: 25,
      overflow: "hidden",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderColor: "rgba(255, 255, 255, 0.3)",
      borderWidth: 1,
      alignItems: "center",
    },
    header: {
      fontSize: 38,
      fontWeight: "900",
      textAlign: 'center',
      color: "#f7f7f7",
      marginBottom: 8,
    },
    subHeader: {
      fontSize: 24,
      fontFamily: 'Nunito',
      color: "#eee",
      marginBottom: 20,
      fontWeight: '900',
      textAlign: "center",
    },
    forgot: {
      alignSelf: "flex-end",
      color: "#ddd",
      marginTop: 10,
      fontSize: 12,
    },
    or: {
      marginTop: 20,
      color: "#ccc",
    },
    footer: {
      marginTop: 20,
      color: "#ccc",
      fontFamily: 'Nunito',
    },
    register: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      fontFamily: 'Nunito',
      marginBottom: -6,
    },
  });
  