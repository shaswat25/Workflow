import React from "react";
import { Handle, Position } from '@xyflow/react';

import { TaskNodes,ConditionNodes,Title,NotificationNodes } from "../style_component/node-component";


export  function TaskNode({ data, isConnectable }) {

  
    return (
      <>
        <Handle type="target" position={Position.Top} />
        <TaskNodes>
          <Title>Task</Title>
          <p><strong>{data.taskName}</strong> </p>
          <p> {data.assignee}</p>
          <p> {data.dueDate}</p>
          <p><strong>Status:</strong> {data.status}</p>
        </TaskNodes>
        <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
      </>
    );
  }
  
  // Custom Condition Node
export function ConditionNode ({ data, isConnectable })  {
    return(
    <>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <ConditionNodes>
        <Title>Condition</Title>
        <p><strong>{data.condition}</strong> </p>
        <p><strong>Status:</strong> {data.status}</p>
      </ConditionNodes>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  )};
  
  // Custom Notification Node
 export  function NotificationNode ({ data, isConnectable })  {
    
    return(
    <>
      <Handle type="target" position={Position.Top} />
      <NotificationNodes>
        <Title>Notification</Title>
        <p>{data.message} </p>
        <p><strong>Status:</strong> {data.status}</p>
        </NotificationNodes>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </>
  )};