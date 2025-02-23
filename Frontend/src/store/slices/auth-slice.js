import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Load token and user from localStorage
const token = localStorage.getItem("token") ?? null;
let user = localStorage.getItem("user") ?? null;
if (user && user !== "undefined") user = JSON.parse(user);

const isAuthenticated = token && user;

const initialState = {
  token,
  user,
  isAuthenticated,
  userData: null, // For additional user-specific data
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    handleLogout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.userData = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { handleLogin, handleLogout, setUserData, setLoading, setError } = authSlice.actions;

// Async thunk to fetch user data
export const fetchUserData = () => async (dispatch, getState) => {
  const { token, user } = getState().auth;

  if (user && token) {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`/api/users/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUserData(response.data)); // Populate user-specific data
    } catch (error) {
      dispatch(setError("Failed to load user data"));
    } finally {
      dispatch(setLoading(false));
    }
  }
};

export default authSlice.reducer;
