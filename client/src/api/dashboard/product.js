import adminInstance from "../adminInstance";
import toast from "react-hot-toast";

export const addProduct = async (data) => {
  try {
    const response = await adminInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/admin/product/add`,
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
    toast.error(error.response?.data?.message || "An error occurred");
    throw error.response?.data;
  }
};

export const getProducts = async ({
  pageIndex,
  pageSize,
  sorting,
  filters,
}) => {
  try {
    const response = await adminInstance.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/admin/products?pageIndex=${pageIndex}&pageSize=${pageSize}&filters=${JSON.stringify(
        filters
      )}&sorting=${JSON.stringify(sorting)}`
    );
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
    throw error.response?.data;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await adminInstance.delete(
      `${import.meta.env.VITE_BACKEND_URL}/admin/product/delete`,
      { data: { id } }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
    throw error.response?.data;
  }
};

export const updateProduct = async (data) => {
  try {
    const response = await adminInstance.patch(
      `${import.meta.env.VITE_BACKEND_URL}/admin/product/update`,
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
    toast.error(error.response?.data?.message || "An error occurred");
    throw error.response?.data;
  }
};
