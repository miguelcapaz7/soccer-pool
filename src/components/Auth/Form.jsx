import React from "react";
import Button from "../Button";
import useForm from "../../hooks/Auth/useForm";

const Form = ({ fields, onSubmit, buttonText, extraButton }) => {
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
      <Button type="submit" color="dark" style={{ width: "135px" }}>{buttonText}</Button>
      {extraButton && (
        <>
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">OR</span>
          <hr className="flex-grow-1" />
        </div>
        {extraButton}
        </>
        )}
    </form>
  );
};

export default Form;