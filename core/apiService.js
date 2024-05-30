import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for your backend
const BASE_URL = process.env.EXPO_PUBLIC_API_SERVER_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Fetch the token from AsyncStorage
    const token = await AsyncStorage.getItem('token');
    
    if (token) {
      // If the token exists, set the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to make HTTP requests
const request = async (method, url, data = null) => {
  try {
    const response = await api.request({
      method,
      url,
      data,
    });

    let responseData = response.data;

    if (responseData.error) {
      return {
        isError: true,
        errorMessage: responseData.message,
        data: [],
      };
    }

    return {
      isError: false,
      errorMessage: '',
      data: responseData.data, // Return the data
    }
  } catch (error) {
    return {
      isError: true,
      errorMessage: error.message,
      data: [],
    }
  }
};

const publicRequest = async (method, url, data = null) => {
  try {
    const response = await api.request({
      method,
      url,
      data,
    });

    return {
      isError: false,
      errorMessage: '',
      data: response.data, 
    }
  } catch (error) {
    return {
      isError: true,
      errorMessage: response?.message || error.message,
      data: [],
    }
  }
};

export { request, publicRequest};
