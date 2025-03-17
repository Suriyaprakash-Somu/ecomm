import adminInstance from "../adminInstance";
import toast from "react-hot-toast";

export const getOrders = async ({ pageIndex, pageSize, sorting, filters }) => {
  try {
    const response = await adminInstance.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/admin/orders?pageIndex=${pageIndex}&pageSize=${pageSize}&filters=${JSON.stringify(
        filters
      )}&sorting=${JSON.stringify(sorting)}`
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response.data;
  }
};

export const updateOrder = async ({ order_id, order_status }) => {
  try {
    const response = await adminInstance.patch(
      `${import.meta.env.VITE_BACKEND_URL}/admin/order/update`,
      { order_id, order_status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to update order status"
    );
    throw error.response?.data;
  }
};
