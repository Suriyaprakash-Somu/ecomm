import adminInstance from "../adminInstance";
import toast from "react-hot-toast";

export const getUsers = async ({ pageIndex, pageSize, sorting, filters }) => {
  try {
    const response = await adminInstance.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/admin/users?pageIndex=${pageIndex}&pageSize=${pageSize}&filters=${JSON.stringify(
        filters
      )}&sorting=${JSON.stringify(sorting)}`
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response.data;
  }
};

export const deleteUser = async (id) => {
  console.log(id);

  try {
    const response = await adminInstance.delete(
      `${import.meta.env.VITE_BACKEND_URL}/admin/user/delete`,
      { data: { id } }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error.response.data;
  }
};

export const updateUser = async (data) => {
  try {
    const response = await adminInstance.patch(
      `${import.meta.env.VITE_BACKEND_URL}/admin/user/update`,
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
