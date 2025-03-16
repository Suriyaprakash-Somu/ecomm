import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../UI/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { addCategory, updateCategory } from "../../../api/dashboard/category";

const schema = yup.object().shape({
  category_name: yup.string().required("Category name is required"),
  isActive: yup.boolean(),
});

const Category = ({ type = "add", editData = null, onClose }) => {
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
      category_name: type === "edit" ? editData.category_name : "",
      isActive: type === "edit" ? editData.isActive : true,
    },
  });

  const addMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("category");
      if (onClose) onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("category");
      if (onClose) onClose();
    },
  });

  const onSubmit = (data) => {
    if (type === "add") {
      addMutation.mutate(data);
    } else {
      data.category_id = editData.category_id;
      updateMutation.mutate(data);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{type === "edit" ? "Edit Category" : "Add Category"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="category_name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Category Name"
              error={errors.category_name?.message}
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
          disabled={addMutation.isLoading || updateMutation.isLoading}
        >
          {addMutation.isLoading || updateMutation.isLoading
            ? "Saving..."
            : type === "edit"
            ? "Update Category"
            : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default Category;
