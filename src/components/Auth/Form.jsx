import React from "react";
import Button from "../Button.jsx";
import LoadingSpinner from "../LoadingSpinner.jsx";

const Form = ({ fields, form, buttonText, footer, showDivider }) => {
  const { formData, handleChange, handleSubmit, error, isSubmitting } = form;

  if (isSubmitting) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {fields.map(({ name, type, placeholder, required }) => (
        <div key={name} className="mb-3">
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            className="form-control"
            required={required}
            value={formData[name]}
            onChange={handleChange}
          />
        </div>
      ))}

      <Button
        type="submit"
        color="dark"
        disabled={isSubmitting}
        style={{ width: "100%" }}
      >
        {buttonText}
      </Button>

      {showDivider && (
        <div className="d-flex align-items-center my-5">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">OR</span>
          <hr className="flex-grow-1" />
        </div>
      )}

      {footer && <div className="text-center mt-5">{footer}</div>}
    </form>
  );
};

export default Form;
