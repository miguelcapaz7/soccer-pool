import { useState } from "react";

const useForm = (initialValues = {}, onSubmit) => {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await onSubmit(formData);
    } catch (err) {
      console.error("Error in form submission:", err);
      setError(err.message || "Something went wrong.");
    }
  };

  return { formData, handleChange, handleSubmit, error, setError };
};

export default useForm