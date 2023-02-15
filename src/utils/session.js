export const setSession = (token) => {
  if (!token) return;
  try {
    localStorage.setItem("authToken", token);
  } catch (error) {
    console.error(error);
  }
};

export const getSession = () => {
  try {
    return localStorage.getItem("authToken");
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
