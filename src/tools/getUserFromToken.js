import { decode as atob } from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserFromToken = async () => {
  const token = await AsyncStorage.getItem('userToken');

  if (!token) return null;

  try {
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload)); 
    return decodedPayload; // { sub, email }
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
};

export default getUserFromToken;