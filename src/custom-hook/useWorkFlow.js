import { useState, useCallback } from "react";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
const initialNodes = [
    {
      id: "node-1",
      type: "task",
      position: { x: 100, y: 100 },
      data: {   },
    },
   
  ];
const useWorkflow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const onEdgeClick = useCallback(
    (event, edge) => {
      // Delete the edge when clicked
      const updatedEdges = edges.filter((e) => e.id !== edge.id);
      setEdges(updatedEdges);
    },
    [edges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const addNode = useCallback((type, data,position) => {
    setNodes((nds) => {
      const newNode = { 
        id: `node-${nds.length + 1}`,  // Ensure length increments correctly
        type, 
        data:data? { ...data }:{}, 
        position:position || { x: 100, y: 100 } 
      };
      
      console.log("Existing nodes:", nds.length);
      console.log("Adding new node:", newNode);
  
      return [...nds, newNode]; // Append new node without replacing
    });
  }, [setNodes]);

  const onNodeChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgeChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  },[]);

  return { onEdgeClick,nodes, edges,onConnect, setNodes, setEdges, addNode, onNodeChange, onEdgeChange, deleteNode };
};

export default useWorkflow;
