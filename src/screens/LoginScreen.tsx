import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Touchable, TouchableOpacity } from "react-native";
import { BlurView } from "@react-native-community/blur";
import CustomInputField from "../components/CustomInputField";
import CustomButton from "../components/CustomButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require("../assets/imgs/background3.png")}
      style={styles.background}
    >
      <View style={styles.glassWrapper}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="ultraThinMaterialDark"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <Text style={styles.header}>Hello Again!</Text>
        <Text style={styles.subHeader}>Welcome back, You’ve been missed!</Text>
        <CustomInputField
          placeholder="Enter Username"
          value={email}
          boxStyles={{marginBottom: 14}}
          onChangeText={setEmail}
        />
        <CustomInputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.forgot}>Forgot Password?</Text>
        {/* <CustomButton placeholder="Sign In" onPress={() => {}} /> */}
        <TouchableOpacity onPress={()=>{}} style={{marginTop: 12}}>
            <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                Sign In
            </Text>
        </TouchableOpacity>
       

        <Text style={styles.footer}>
          Don’t have an account? <Text style={styles.register}>Register Now</Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
    color: "#fff",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: "#eee",
    marginBottom: 20,
    fontWeight: 'bold',
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
  },
  register: {
    color: "#4facfe",
    fontWeight: "600",
  },
});
