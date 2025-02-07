import React,{useState} from "react";

import { infoObj } from "./infoObj";
import DeleteConfirmationModal from "./deleteWarningModal";
import NodeConfigPanelComp from "../components/NodeconfigComponent";
const NodeConfigPanel = ({ node, setNodes, deleteNode, setNodeConfigModal, addNode }) => {
  

  return (
    <div style={{ marginTop: 8 }}>
      <NodeConfigPanelComp
        onDelete={() => {
          deleteNode(node.id)
          setNodeConfigModal(false)
        
          
        }}
        onclose={() => setNodeConfigModal(false)}
        onSubmitData={(data) => {
          if (!node?.id) {
            // Adding a new node if no id exists
            addNode(node.type, data);
            return;
          }

          // Update the existing node with new data
          setNodes((nds) =>
            nds.map((n) => (n.id === node.id ? { ...n, data: { ...data } } : n))
          );
          setNodeConfigModal(false)
        }}
        formFields={infoObj[node.type]}
        defaultValues={node.data}
      />
      
    
    </div>
  );
};

export default NodeConfigPanel;

