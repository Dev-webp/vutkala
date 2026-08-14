import axios from "axios";

const API = "http://localhost:5000/api/auth";

const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

// =====================================================
// REGISTER
// =====================================================

export const registerUser = async (data) => {
  return await api.post("/register", data);
};

// =====================================================
// LOGIN
// =====================================================

export const loginUser = async (data) => {
  return await api.post("/login", data);
};

// =====================================================
// LOGOUT
// =====================================================

export const logoutUser = async () => {
  return await api.post("/logout");
};

// =====================================================
// GET CURRENT LOGGED-IN USER
// =====================================================

export const getCurrentUser = async () => {
  return await api.get("/me");
};

// =====================================================
// FORGOT PASSWORD
// =====================================================

export const forgotPassword = async (data) => {
  return await api.post("/forgot", data);
};

// =====================================================
// RESET PASSWORD
// =====================================================

export const resetPassword = async (data) => {
  return await api.post("/reset-password", data);
};

// =====================================================
// SEND REGISTRATION OTP
// =====================================================

export const sendRegisterOTP = async (data) => {
  return await api.post("/register/send-otp", data);
};

// =====================================================
// VERIFY REGISTRATION OTP
// =====================================================

export const verifyRegisterOTP = async (data) => {
  return await api.post(
    "/register/verify-otp",
    data
  );
};