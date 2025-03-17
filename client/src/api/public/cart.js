import toast from "react-hot-toast";
import customerInstance from "./../customerInstance";

export const checkout = async (data) => {
  try {
    const response = await customerInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/checkout`,
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
