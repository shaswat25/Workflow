import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import CloseIcon from "../assets/close.svg";
import useFormHandler from "../custom-hook/useFormHandler";

const NodeConfigPanelComp = ({ onDelete, onclose, onSubmitData, formFields, defaultValues }) => {
  const { register, handleSubmit, errors } = useFormHandler(formFields, defaultValues);

  const onSubmit = (data) => {
    // Handle node addition with data here
    onSubmitData(data);
  };

  const handleDelete = () => {
    // Handle node deletion
    onDelete();
    
  };

  return (
    <StyledForm
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Header>
        <h4>Edit Node</h4>
        <CloseIconWrapper onClick={onclose}>
          <img src={CloseIcon} height={20} width={20} alt="Close" />
        </CloseIconWrapper>
      </Header>

      {/* Dynamically rendering the form fields */}
      {formFields.map((field, index) => (
        <FormGroup key={index}>
          <Label>{field.label}:</Label>

          {field.type === "input" && (
            <>
              <Input
                {...register(field.name, {
                  required: field.required && `${field.label} is required`,
                })}
              />
              {errors[field.name] && <ErrorMessage>{errors[field.name]?.message}</ErrorMessage>}
            </>
          )}

          {field.type === "date" && (
            <>
              <Input
                {...register(field.name, {
                  required: field.required && `${field.label} is required`,
                })}
                type="date"
                min={new Date().toISOString().split("T")[0]}
              />
              {errors[field.name] && <ErrorMessage>{errors[field.name]?.message}</ErrorMessage>}
            </>
          )}

          {field.type === "select" && (
            <>
              <Select
                {...register(field.name, {
                  required: field.required && `${field.label} is required`,
                })}
              >
                {field.option?.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              {errors[field.name] && <ErrorMessage>{errors[field.name]?.message}</ErrorMessage>}
            </>
          )}
        </FormGroup>
      ))}

      <ButtonWrapper>
        <SaveButton type="submit">Save</SaveButton>
        <DeleteButton type="button" onClick={handleDelete}>Delete Node</DeleteButton>
      </ButtonWrapper>
    </StyledForm>
  );
};

export default NodeConfigPanelComp;

// StyledForm and Buttons can be passed as props for customised background
const StyledForm = styled(motion.form)` 
  padding: 12px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  color: #333;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
`;

const CloseIconWrapper = styled.div`
  cursor: pointer;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
  background-color: #ffffff;
  color: #333;
  &:focus {
    border-color: #007bff;
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
  background-color: #ffffff;
  color: #333;
  &:focus {
    border-color: #007bff;
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #dc3545;
  margin-top: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: #28a745;
  color: white;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: #dc3545;
  color: white;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #c82333;
  }
`;
