import axios, { AxiosError } from "axios";
import store from "@/store";
import { handleLogout } from "@/store/slices/auth-slice";

export const post_api = (url, body) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });


// we can create a reusable instance that contains all the basic config for api integration.

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// we check each response from backend for unauthorized request so that we can remove user from local storage and from global store / context.
// STATUS 401 => unauthorized

function successfulCallback(response) {
  return Promise.resolve(response);
}
function errorCallback(error) {
  // check whether error.response.status === 401
  // if above true clear localStorage and global store / context
  // also make a navigation to login page.
  // otherwise simply reject the error
  if (error.response.status !== 401) return Promise.reject(error);
  store.dispatch(handleLogout());
  // navigate to login
  window.location.replace("/auth/login");
}
axiosInstance.interceptors.response.use(successfulCallback, errorCallback);

// pass axios instance methods to more meaningful variables through function expressions.

export const POST_API = axiosInstance.post;
export const GET_API = axiosInstance.get;
export const PUT_API = axiosInstance.put;
export const DELETE_API = axiosInstance.delete;

export const handleApiError = (error) => {
  if (error instanceof AxiosError) {
    return Promise.reject(error?.response?.data ?? error);
  }
  return Promise.reject({ message: "Runtime Exception!" });
};
