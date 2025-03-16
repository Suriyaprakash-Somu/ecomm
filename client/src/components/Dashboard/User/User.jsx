import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../UI/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { updateUser } from "../../../api/dashboard/user";

const schema = yup.object().shape({
  user_name: yup.string().required("Name is required"),
  user_email: yup.string().email("Invalid email").required("Email is required"),
  isActive: yup.boolean(),
});

const User = ({ type = "add", editData, onClose }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      user_name: editData.user_name,
      user_email: editData.user_email,
      isActive: editData.isActive,
    },
  });

  useEffect(() => {
    if (type === "edit" && editData) {
      setValue("user_name", editData.user_name || "");
      setValue("user_email", editData.user_email || "");
      setValue("isActive", editData.isActive === 1);
    }
  }, [type, editData, setValue]);

  const mutation = useMutation({
    mutationFn: type === "edit" ? updateUser : createUser,
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      if (onClose) onClose();
    },
  });

  const onSubmit = (data) => {
    if (type === "edit") {
      mutation.mutate({ ...data, user_id: editData.user_id });
    } else {
      mutation.mutate(data);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{type === "edit" ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="user_name"
          control={control}
          render={({ field }) => (
            <Input {...field} label="Name" error={errors.user_name?.message} />
          )}
        />
        <Controller
          name="user_email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Email"
              type="email"
              error={errors.user_email?.message}
            />
          )}
        />
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <div className="form-check">
              <input
                {...field}
                type="checkbox"
                className="form-check-input"
                checked={field.value}
              />
              <label className="form-check-label">Active</label>
            </div>
          )}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading
            ? "Saving..."
            : type === "edit"
            ? "Update User"
            : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default User;
