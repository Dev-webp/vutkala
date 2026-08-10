import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const registerUser = async (data) => {
  return await axios.post(`${API}/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${API}/login`, data);
};

export const forgotPassword = async (data) => {
  return await axios.post(`${API}/forgot`, data);
};

export const resetPassword = async (data) => {
  return await axios.post(`${API}/reset-password`, data);
};

export const sendRegisterOTP = async (data) => {
  return await axios.post(`${API}/register/send-otp`, data);
};

export const verifyRegisterOTP = async (data) => {
  return await axios.post(`${API}/register/verify-otp`, data);
};