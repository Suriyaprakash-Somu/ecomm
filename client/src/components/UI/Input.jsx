import React from "react";

const Input = React.forwardRef(({ label, error, ...props }, ref) => (
  <div className="mb-3">
    {label && <label htmlFor={props.id || props.name}>{label}</label>}
    <input
      ref={ref}
      {...props}
      className={`form-control ${error ? "is-invalid" : ""}`}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
));

export default Input;
