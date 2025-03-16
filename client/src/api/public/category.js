import axios from "axios";
import toast from "react-hot-toast";

export const getCustomerCategories = async ({
  pageIndex = 0,
  pageSize = 10,
}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/categories`,
      {
        params: { pageIndex, pageSize },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to load categories");
    throw error.response?.data || error;
  }
};
