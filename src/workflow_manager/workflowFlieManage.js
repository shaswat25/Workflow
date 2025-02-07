import React, { useRef } from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 12px 12px;
  background-color: ${({ bgColor }) => bgColor || "#007bff"};  /* Default to blue */
  color: ${({ color }) => color || "white"};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor || "#0056b3"};  /* Darker shade of blue */
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:focus {
    outline: none;
  }
`;





const WorkflowFile = ({ nodes, edges, setNodes, setEdges }) => {
  const fileInputRef = useRef(null); // Reference for file input

  // Function to export the workflow (nodes + edges)
  const exportWorkflow = () => {
    const workflowData = { nodes, edges }; // Include edges in export
    const dataStr = JSON.stringify(workflowData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  // Function to trigger file input on button click
  const handleImportClick = () => {
    fileInputRef.current.click(); // Opens file selection dialog
  };

  // Function to handle file import
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const { nodes: importedNodes, edges: importedEdges } = JSON.parse(e.target.result);

        // Ensure valid nodes and edges arrays
        if (Array.isArray(importedNodes) && Array.isArray(importedEdges)) {
          setNodes(importedNodes);
          setEdges(importedEdges);
        } else {
          alert("Invalid file format. Please upload a valid workflow JSON.");
        }
      } catch (error) {
        alert("Error parsing JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
       <Button
      bgColor="blue"
      hoverBgColor="#0056b3"
      onClick={exportWorkflow}
    >
      Export
    </Button>
    <Button
      bgColor="green"
      hoverBgColor="#218838"
      onClick={handleImportClick}
    >
      Import
    </Button>

      <input
        type="file"
        accept="application/json"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: "none" }} // Hides default file input UI
      />
    </div>
  );
};

export default WorkflowFile;
