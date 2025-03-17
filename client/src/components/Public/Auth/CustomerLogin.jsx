import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../UI/Input";
import { customerLogin } from "../../../api/public/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../../store/customerSlice";

const schema = yup.object().shape({
  customer_email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  customer_password: yup.string().required("Password is required"),
});

const CustomerLogin = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: customerLogin,
    onSuccess: (data) => {
      localStorage.setItem("customer", data.token);
      dispatch(setCustomer(data.customer));
      navigate("/");
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
      <h2>Customer Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default CustomerLogin;
