// src/api/loginApi.js
import api from "./axios";

// ✅ Login API function
export const loginUser = async (mobile, password) => {
  try {
    const response = await api.post("/admin/superLogin", {
      mobile,
      password,
    });
    return response.data; // return API response data
  } catch (error) {
    // Throw error so the store can catch and handle it
    throw error.response?.data || { message: "Network error" };
  }
};
