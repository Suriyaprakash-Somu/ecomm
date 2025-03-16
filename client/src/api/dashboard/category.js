import adminInstance from "../adminInstance";
import toast from "react-hot-toast";

export const addCategory = async (data) => {
  try {
    const response = await adminInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/admin/category/add`,
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

export const getCategories = async ({
  pageIndex,
  pageSize,
  sorting,
  filters,
}) => {
  try {
    const response = await adminInstance.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/admin/categories?pageIndex=${pageIndex}&pageSize=${pageSize}&filters=${JSON.stringify(
        filters
      )}&sorting=${JSON.stringify(sorting)}`
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response.data;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await adminInstance.delete(
      `${import.meta.env.VITE_BACKEND_URL}/admin/category/delete`,
      { data: { id } }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response.data;
  }
};

export const updateCategory = async (data) => {
  try {
    const response = await adminInstance.patch(
      `${import.meta.env.VITE_BACKEND_URL}/admin/category/update`,
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

export const getAllCategories = async () => {
  try {
    const response = await adminInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/admin/categories?all=true`
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response.data;
  }
};
