import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  width: 100vw;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: #f4f4f4;
  color: black;
  font-size: 24px;
  box-shadow: 0 2px 5px #f4f4f4;
`;

const Logo = styled.img`
  height: 60px;
  width: 100px;
`;

const OpenPanelButton = styled.button`
  background-color: #2d3e50;
  color: white;
  padding: 10px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height:40px;
  margin-top:10px
`;

const ClosePanelButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e91e63;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SidePanel = styled.div`
  width: 28vw;
  background-color: #d6d0c4;
  padding: 20px;
  border-left: 1px solid #ddd;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;  /* Increased gap for better spacing between buttons */
`;

const StyledButton = styled.button`
  background: ${({ bg }) => bg || "white"};
  border: 1px solid ${({ border }) => border || "black"};
  color: ${({ border }) => border || "black"};
  padding: 8px 8px;  /* Larger padding for a more comfortable click area */
  font-size: 14px;  /* Slightly larger font size */
  border-radius: 8px;  /* Rounded corners for a smoother look */
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);  /* Subtle shadow for depth */
  transition: all 0.3s ease-in-out;  /* Smooth transition for hover effects */
  
  &:hover {
    transform: translateY(-2px);  /* Slight lift on hover */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);  /* Stronger shadow on hover */
  }

`;


const DropdownContainer = styled.div`
  position: absolute;
  z-index: 10;
  top: 70px;
  left: 30px;
  border: 1px solid #ddd;
  background-color: white;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;


export {
  Container,
  Header,
  Logo,
  OpenPanelButton,
  ClosePanelButton,
  SidePanel,
  ButtonGroup,
  StyledButton,
  DropdownContainer
  
};
