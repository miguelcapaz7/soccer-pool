import { useState } from "react";

const useForm = (initialValues = {}, onSubmit) => {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      console.error("Error in form submission:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, handleChange, handleSubmit, error, isSubmitting };
};

export default useForm