import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../UI/Input";
import { adminLogin } from "../../../api/dashboard/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const schema = yup.object().shape({
  user_email: yup.string().email("Invalid email").required("Email is required"),
  user_password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      localStorage.setItem("user", data.token);
      navigate("/dashboard");
    },
    onError: (data) => {
      console.error(data);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
