import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../UI/Input";
import { adminSignup } from "../../../api/dashboard/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const schema = yup.object().shape({
  user_name: yup.string().required("Name is required"),
  user_email: yup.string().email("Invalid email").required("Email is required"),
  user_password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: adminSignup,
    onSuccess: (data) => {
      navigate("/admin/login");
    },
    onError: (data) => {},
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="user_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} label="Name" error={errors.user_name?.message} />
          )}
        />
        <Controller
          name="user_email"
          control={control}
          defaultValue=""
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
          name="user_password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Password"
              type="password"
              error={errors.user_password?.message}
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

export default Signup;
