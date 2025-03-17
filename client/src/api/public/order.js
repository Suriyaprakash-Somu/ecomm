import customerInstance from "../customerInstance";
import toast from "react-hot-toast";

export const getOrders = async ({ pageIndex, pageSize, sorting, filters }) => {
  try {
    const response = await customerInstance.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/orders?pageIndex=${pageIndex}&pageSize=${pageSize}&filters=${JSON.stringify(
        filters
      )}&sorting=${JSON.stringify(sorting)}`
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response.data;
  }
};
