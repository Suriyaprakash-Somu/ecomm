import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../UI/Input";
import { customerSignup } from "../../../api/public/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const schema = yup.object().shape({
  customer_name: yup.string().required("Name is required"),
  customer_email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  customer_password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const CustomerSignup = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: customerSignup,
    onSuccess: (data) => {
      navigate("/login");
    },
    onError: (data) => {},
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="container mt-5">
      <h2>Customer Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="customer_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Name"
              error={errors.customer_name?.message}
            />
          )}
        />
        <Controller
          name="customer_email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Email"
              type="email"
              error={errors.customer_email?.message}
            />
          )}
        />
        <Controller
          name="customer_password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Password"
              type="password"
              error={errors.customer_password?.message}
            />
          )}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default CustomerSignup;
