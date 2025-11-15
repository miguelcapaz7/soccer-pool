import React from "react";
import Button from "../Button";
import useForm from "../../hooks/Auth/useForm";

const Form = ({ fields, onSubmit, buttonText, signUpLink, showDivider }) => {
  const { formData, handleChange, handleSubmit, error } = useForm(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
    onSubmit
  );

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fields.map((field) => (
        <input
          key={field.name}
          name={field.name}
          type={field.type}
          className={`form-control mb-${field.marginBottom || 3}`}
          value={formData[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
          required={field.required}
        />
      ))}
      <div className="d-grid gap-2 mt-3">
        <Button type="submit" color="dark" style={{ width: "100%" }}>
          {buttonText}
        </Button>
      </div>
      {showDivider && (
        <>
          <div className="d-flex align-items-center my-5">
            <hr className="flex-grow-1" />
            <span className="mx-2 text-muted">OR</span>
            <hr className="flex-grow-1" />
          </div>
        </>
      )}
      <div className="text-center mt-5">{signUpLink}</div>
    </form>
  );
};

export default Form;
