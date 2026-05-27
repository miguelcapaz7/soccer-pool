import React from "react";
import Button from "../Button.jsx";
import { useState } from "react";

const Form = ({ fields, form, buttonText, footer, showDivider }) => {
  const { formData, handleChange, handleSubmit, error, isSubmitting } = form;
  const [revealed, setRevealed] = useState({});

  const toggle = (name) =>
    setRevealed((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div
          className="alert alert-danger py-2 small mb-3"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      {fields.map(({ name, type, placeholder, required, autoComplete }) => {
        const isPassword = type === "password";
        const inputType = isPassword && revealed[name] ? "text" : type;

        return (
          <div key={name} className="form-floating mb-3 position-relative">
            <input
              id={name}
              name={name}
              type={inputType}
              placeholder={placeholder}
              className="form-control px-3"
              required={required}
              autoComplete={autoComplete}
              value={formData[name] ?? ""}
              onChange={handleChange}
              aria-invalid={Boolean(error)}
              disabled={isSubmitting}
            />
            <label htmlFor={name} className="px-3">{placeholder}</label>
          </div>
        );
      })}

      <button
        type="submit"
        className="btn btn-dark w-100 py-2 mt-2 d-flex align-items-center justify-content-center gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
        )}
        {isSubmitting ? "" : buttonText}
      </button>

      {showDivider && (
        <div className="d-flex align-items-center my-4">
          <hr className="flex-grow-1 m-0" />
          <span className="mx-3 text-muted small">OR</span>
          <hr className="flex-grow-1 m-0" />
        </div>
      )}

      {footer && <div className="text-center mt-4 small">{footer}</div>}
    </form>
  );
};

export default Form;
