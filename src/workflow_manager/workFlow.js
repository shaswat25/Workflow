import { useState,useCallback } from "react";

import {
  ReactFlow,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeConfigPanel from "./NodeConfigPanel";
import useWorkflow from "../custom-hook/useWorkFlow";
import WorkflowTable from "../components/WorkFlowTable";
import WorkflowFile from "./workflowFlieManage";
import { TaskNode, ConditionNode, NotificationNode } from "./Nodes";
import { Container, Header, Logo, OpenPanelButton, SidePanel, ButtonGroup, StyledButton,DropdownContainer } from "../style_component/styled-compnent"
import edit from "../assets/editPencil.svg"
import deleteIcon from "../assets/delete.svg"
import close from "../assets/close.svg"
import Plus from "../assets/plus.svg"
import DeleteConfirmationModal from "./deleteWarningModal";
const nodeTypes = {
  task: TaskNode,
  condition: ConditionNode,
  notification: NotificationNode,
};




function Workflow() {
  const { onEdgeClick, onConnect, nodes, edges, addNode, setNodes, setEdges, deleteNode, onNodeChange, onEdgeChange } = useWorkflow();
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [nodeConfigModal, setNodeConfigModal] = useState(false)
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [deleteModal,setDeleteModal]=useState(false)
  const [deleteId,setDeleteId]=useState()

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
  
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;
  
      // Get the drop position relative to the ReactFlow container
      const reactFlowBounds = event.target.getBoundingClientRect();
      const sidePanelWidth = window.innerWidth * 0.28;
      const position = reactFlowBounds
        ? {
            x: event.clientX - reactFlowBounds.left - sidePanelWidth,
            y: event.clientY - reactFlowBounds.top,
          }
        : { x: 100, y: 100 }; // Fallback position if bounds are not available
  
      // Add the new node at the calculated position
      addNode(type, undefined, position);
    },
    [addNode] // Dependencies: ensure it doesn't recreate unless `addNode` changes
  );
  const columnsConfig = [
    {
      accessor: 'type',
      header: 'Node Type',
      id: 'nodeType',
      width: '150px', // Explicit width
    },
    {
      accessor: (row) => {

        return row.type === "task" ? row.data.taskName : row.type === "condition" ? row.data?.condition : row.data.message
      },
      header: 'Node Name',
      id: 'nodeName',
      width: '200px', // Explicit width
    },
    {
      accessor: 'data.status',
      header: 'Status',
      id: 'status',
      width: '120px', // Explicit width
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      accessor: 'data.label',
      header: 'Action',
      id: 'actions',
      width: '100px', // Explicit width
      cell: (info) => (
        <div style={{ display: 'flex' }}>
          <div
            onClick={() => {
              setNodeConfigModal(true)
              setSelectedNode(info.row.original);
            }}
            style={{ marginRight: '8px', cursor: 'pointer' }}
          >
            <img src={edit} height={10} width={10} alt="Edit" />
          </div>
          <div
            onClick={() => {
              setDeleteModal(true)
              setDeleteId(info.row.original.id)
              
            }}
            style={{ cursor: 'pointer' }}
          >
            <img src={deleteIcon} height={10} width={10} alt="Delete" />
          </div>
        </div>
      ),
    },
  ];




  return (
    <Container>
      <Header>
        <Logo src="https://www.tigeranalytics.com/wp-content/uploads/2023/09/TA-Logo-resized-for-website_.png" alt="Tiger Analytics Logo" />
        <span>Tiger Analytics Workflow</span>
        <div style={{ display: "flex", gap: 10 }}>
          <WorkflowFile nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
          <OpenPanelButton onClick={() => setIsSidePanelOpen(true)}>Open Workflow Panel</OpenPanelButton>
        </div>
      </Header>

      <div style={{ height: "90vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodeChange}
          onEdgesChange={onEdgeChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onEdgeClick={onEdgeClick}
          onNodeClick={(event, node) => {
            setIsSidePanelOpen(true)
            setNodeConfigModal(true);
            setSelectedNode(node);
          }}
          onDrop={onDrop}
          onDragOver={(event) => event.preventDefault()} // Allow dropping
          fitView
        />
      </div>

      <SidePanel open={isSidePanelOpen}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div onClick={toggleDropdown} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <img src={Plus} alt="Plus Icon" height={30} width={30} />
            <h4>Add/Drag Node</h4>
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => {
            setIsSidePanelOpen(false)
          }}><img src={close} height={20} width={20} /></div>
        </div>
        {dropdownVisible && (
         <DropdownContainer>
            <ButtonGroup onClick={(e) => {
              console.log(e.target.id)
              setSelectedNode(null)
              let data = {}
              data["type"] = e.target.id
              setSelectedNode(data)
              setNodeConfigModal(true)
            }}>
              <StyledButton
                id="task"
                bg="white"
                border="black"
                draggable
                onDragStart={(event) => event.dataTransfer.setData("application/reactflow", "task")}
              >
                Task
              </StyledButton>
              <StyledButton
                id="condition"
                bg="#e3f2fd"
                border="blue"
                draggable
                onDragStart={(event) => event.dataTransfer.setData("application/reactflow", "condition")}
              >
                Condition
              </StyledButton>
              <StyledButton
                id="notification"
                bg="#e8f5e9"
                border="green"
                draggable
                onDragStart={(event) => event.dataTransfer.setData("application/reactflow", "notification")}
              >
                Notification
              </StyledButton>
            </ButtonGroup>
          </DropdownContainer>
        )}



        <WorkflowTable
          data={nodes} // data passed as prop
          columnsConfig={columnsConfig} // columns configuration passed as prop
          setSelectedNode={setSelectedNode}
          deleteNode={deleteNode}
        />

        {nodeConfigModal && <NodeConfigPanel setNodeConfigModal={setNodeConfigModal} node={selectedNode} setNodes={setNodes} deleteNode={deleteNode} addNode={addNode} />}

        
      </SidePanel>
      <DeleteConfirmationModal isOpen={deleteModal} onConfirm={() =>{
        deleteNode(deleteId)
            setDeleteModal(false)
      }} onClose={() =>{
        setDeleteModal(false)
      }}/>
    </Container>
  );
}

export default Workflow;
