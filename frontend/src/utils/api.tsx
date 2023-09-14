import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000', // your backend API URL

});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Replace this with your actual JWT token

    if (token) {
      // Add the token to the request headers
      // config.headers['Authorization'] = `Bearer ${token}`;
      config.headers.common = {
        "x-access-token": `${localStorage.getItem("accessToken")}`,
      };
  
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
