import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from '@env'

// console.log(API_URL)

export const createUser = async ({email, password}) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, {
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
    const response = await axios.post(`${API_URL}/user/login`, {
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