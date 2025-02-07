import styled from "styled-components";
const TaskNodes = styled.div`
padding: 8px;
border: 2px solid black;
border-radius: 5px;
background-color: #f9f9f9;
text-align: center;
width: 150px;
`;

 const ConditionNodes = styled.div`
padding: 8px;
border: 2px solid blue;
border-radius: 5px;
background-color: #e3f2fd;
text-align: center;
width: 150px;
`;

 const NotificationNodes = styled.div`
padding: 8px;
border: 2px solid green;
border-radius: 5px;
background-color: #e8f5e9;
text-align: center;
width: 150px;
`;

 const Title = styled.h6`
margin: 0;
padding-bottom: 5px;
border-bottom: 1px solid black;
`;
export {TaskNodes,ConditionNodes,Title,NotificationNodes}