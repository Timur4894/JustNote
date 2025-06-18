import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createUser = async ({email, password}) => {
  try {
    const response = await axios.post("https://notesappbackend-q50f.onrender.com/user/register", {
      email,
      password,
    });

    const token = response.data.token;

    console.log("User created:", response.data);

    return token;
  } catch (e) {
    console.log('e: ', e)
    const errorMessage = e.response?.data?.message || "Some error :/";
    throw new Error(errorMessage);
  }
};

export const loginUser = async ({email, password}) => {
  try {
    const response = await axios.post("https://notesappbackend-q50f.onrender.com/user/login", {
      email,
      password,
    });

    const token = response.data.token;

    if (token){
      await AsyncStorage.setItem("userToken", token);
    }

    console.log("loginUser:", response.data);

    return token;
  } catch (e) {
    console.log('e: ', e)
    const errorMessage = e.response?.data?.message || "Some error :/";
    throw new Error(errorMessage);
  }
};