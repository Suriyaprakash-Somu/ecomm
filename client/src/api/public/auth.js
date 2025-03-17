import axios from "axios";
import toast from "react-hot-toast";

export const customerSignup = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/signup`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response.data;
  }
};

export const customerLogin = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response.data;
  }
};
