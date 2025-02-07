import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 320px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalHeader = styled.h3`
  margin: 0;
  padding-bottom: 10px;
  color: #e53935;
`;

const ModalText = styled.p`
  font-size: 14px;
  color: #555;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const ConfirmButton = styled.button`
  background-color: #e53935;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #c62828;
  }
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #b0b0b0;
  }
`;

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalText>The Node will be removed.</ModalText>
        <ModalButtons>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ConfirmButton onClick={onConfirm}>Delete</ConfirmButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteConfirmationModal;
