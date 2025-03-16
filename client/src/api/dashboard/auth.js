import axios from "axios";
import toast from "react-hot-toast";

export const adminSignup = async (data) => {
  console.log(data);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/admin/signup`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);

    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response.data;
  }
};

export const adminLogin = async (data) => {
  console.log(data);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/admin/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);

    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response.data;
  }
};
