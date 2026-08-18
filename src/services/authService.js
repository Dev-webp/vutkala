import axios from "axios";

const api = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (data) => {
  return await api.post("/register", data);
};

export const loginUser = async (data) => {
  return await api.post("/login", data);
};

export const logoutUser = async () => {
  return await api.post("/logout");
};

export const getCurrentUser = async () => {
  return await api.get("/me");
};

export const forgotPassword = async (data) => {
  return await api.post("/forgot", data);
};

export const resetPassword = async (data) => {
  return await api.post("/reset-password", data);
};

export const sendRegisterOTP = async (data) => {
  return await api.post("/register/send-otp", data);
};

export const verifyRegisterOTP = async (data) => {
  return await api.post("/register/verify-otp", data);
};