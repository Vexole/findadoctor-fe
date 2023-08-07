import { getLocalStorage, getUser } from '@/utils/userUtils';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://findmyfamilydoc.azurewebsites.net/api',
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

axiosInstance.interceptors.request.use(
  config => {
    const authenticatedUser = getUser();
    const token = authenticatedUser?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['x-api-key'] = '8AB1DC35C98047558ECA734A702F014E';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originalRequest = error.config;
    const authenticatedUser = getUser();
    const expiredJwtToken = authenticatedUser?.token;
    const refreshToken = authenticatedUser?.userRefreshToken;
    const userId = authenticatedUser?.userId;

    if (error.response.status === 401 && refreshToken && !originalRequest._retry && !isRefreshing) {
      originalRequest._retry = true;

      return new Promise((resolve, reject) => {
        refreshSubscribers.push(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axiosInstance(originalRequest));
        });

        if (!isRefreshing) {
          isRefreshing = true;

          axiosInstance
            .post('/account/refreshJwtToken', { refreshToken, expiredJwtToken, userId })
            .then(response => {
              const newToken = response.data;
              getLocalStorage().setItem(
                'user',
                JSON.stringify({ ...authenticatedUser, token: newToken.data })
              );
              window.dispatchEvent(new Event('storage'));
              isRefreshing = false;
              refreshSubscribers.forEach(subscriber => subscriber(newToken));
              refreshSubscribers = [];
            })
            .catch(error => {
              // Handle token refresh error (e.g., redirect to login page)
              isRefreshing = false;
              reject(error);
            });
        }
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
