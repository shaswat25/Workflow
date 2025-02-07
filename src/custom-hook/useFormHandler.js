import { useEffect } from "react";
import { useForm } from "react-hook-form";

const useFormHandler = (formFields, defaultValues = {}) => {
  const { register, handleSubmit, setValue,formState: { errors } } = useForm({
    defaultValues,
  });

  useEffect(() => {
    // Set default values dynamically based on formFields
    formFields.forEach((field) => {
      setValue(field.name, defaultValues[field.name] || "");
    });
  }, [formFields, defaultValues,setValue]);

  return { register, handleSubmit,errors };
};

export default useFormHandler;
