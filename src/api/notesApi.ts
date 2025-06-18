import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";

export const createNote = async (content) => {
    try {
        const token = await AsyncStorage.getItem('userToken')
        const response = await axios.post(
            `${API_URL}/note`,
            { content },
            {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            }
        );
    
        return response.data;
    } catch (e) {
        console.log('e: ', e);
        const errorMessage = e.response?.data?.message || "Some error :/";
        throw new Error(errorMessage);
    }
  };
  

export const getNotes = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken')
        const response = await axios.get(
        `${API_URL}/note`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );

        return response.data;
    } catch (e) {
        console.log('e: ', e);
        const errorMessage = e.response?.data?.message || "Some error :/";
        throw new Error(errorMessage);
    }
};

export const deleteNote = async (noteId) => {
    try {
        const token = await AsyncStorage.getItem('userToken')
        const response = await axios.delete(
            `${API_URL}/note?noteId=${noteId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );

        return response.data;
    } catch (e) {
        console.log('e: ', e);
        const errorMessage = e.response?.data?.message || "Some error :/";
        throw new Error(errorMessage);
    }
};

export const editNote = async (noteId, newContent) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.patch(
        `${API_URL}/note?noteId=${noteId}`,
        { content: newContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data;
    } catch (e) {
      console.log('e: ', e);
      const errorMessage = e.response?.data?.message || "Some error :/";
      throw new Error(errorMessage);
    }
  };
  