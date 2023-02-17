import axiosInstance from "./axios";

export const setSession = (token) => {
  if (!token) return;
  try {
    localStorage.setItem("authToken", token);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } catch (error) {
    console.error(error);
  }
};

export const getSession = () => {
  try {
    const token = localStorage.getItem("authToken");
    if (token)
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const clearSession = () => {
  try {
    localStorage.removeItem("authToken");
  } catch (error) {
    console.error(error);
  }
};
