import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../UI/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { addProduct, updateProduct } from "../../../api/dashboard/product";
import { getAllCategories } from "../../../api/dashboard/category";

const schema = yup.object().shape({
  product_name: yup.string().required("Product name is required"),
  category_id: yup.string().required("Category is required"),
  price: yup.number().positive().required("Price is required"),
  description: yup.string(),
  isActive: yup.boolean(),
  isFeatured: yup.boolean(),
  isRecent: yup.boolean(),
  rating: yup.number().min(0).max(5),
  image_url: yup.string().url("Invalid URL"),
});

const Product = ({ type = "add", editData = null, onClose }) => {
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
      product_name: "",
      category_id: "",
      price: "",
      description: "",
      isActive: true,
      isFeatured: false,
      isRecent: false,
      rating: "",
      image_url: "",
    },
  });

  useEffect(() => {
    if (type === "edit" && editData) {
      setValue("product_name", editData.product_name || "");
      setValue("category_id", editData.category_id || "");
      setValue("price", editData.price || "");
      setValue("description", editData.description || "");
      setValue("isActive", editData.isActive === 1);
      setValue("isFeatured", editData.isFeatured === 1);
      setValue("isRecent", editData.isRecent === 1);
      setValue("rating", editData.rating || "");
      setValue("image_url", editData.image_url || "");
    }
  }, [type, editData, setValue]);

  const {
    data: categories,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getAllCategories,
  });

  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      if (onClose) onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      if (onClose) onClose();
    },
  });

  const onSubmit = (data) => {
    if (type === "add") {
      addMutation.mutate(data);
    } else {
      data.product_id = editData.product_id;
      updateMutation.mutate(data);
    }
  };

  if (isLoading || isFetching) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{type === "edit" ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="product_name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Product Name"
              error={errors.product_name?.message}
            />
          )}
        />

        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select {...field} className="form-control">
                <option value="">Select Category</option>
                {categories?.rows.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-danger">{errors.category_id.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Price"
              type="number"
              error={errors.price?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Description"
              type="textarea"
              error={errors.description?.message}
            />
          )}
        />

        <Controller
          name="image_url"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Image URL"
              type="text"
              error={errors.image_url?.message}
            />
          )}
        />

        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Rating (0-5)"
              type="number"
              error={errors.rating?.message}
            />
          )}
        />

        <div className="mb-3">
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
        </div>

        <div className="mb-3">
          <Controller
            name="isFeatured"
            control={control}
            render={({ field }) => (
              <div className="form-check">
                <input
                  {...field}
                  type="checkbox"
                  className="form-check-input"
                  checked={field.value}
                />
                <label className="form-check-label">Featured</label>
              </div>
            )}
          />
        </div>

        <div className="mb-3">
          <Controller
            name="isRecent"
            control={control}
            render={({ field }) => (
              <div className="form-check">
                <input
                  {...field}
                  type="checkbox"
                  className="form-check-input"
                  checked={field.value}
                />
                <label className="form-check-label">Recent</label>
              </div>
            )}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={addMutation.isLoading || updateMutation.isLoading}
        >
          {addMutation.isLoading || updateMutation.isLoading
            ? "Saving..."
            : type === "edit"
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Product;
