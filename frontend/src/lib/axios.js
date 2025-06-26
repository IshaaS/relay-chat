import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: "https://relay-chat-backend-beey.onrender.com/api",
  withCredentials: true,
});