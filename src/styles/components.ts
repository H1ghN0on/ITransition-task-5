import styled from "styled-components";

export const Title = styled.h3`
  font: 1.5em "Tahoma";
  color: white;
`;

export const Input = styled.input`
  background: #000;
  border-radius: 20px;
  height: 50px;
  margin-top: 20px;
  padding: 0 15px 0 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  &:hover {
    border: none;
  }
`;

export const Submit = styled.button`
  border-radius: 20px;
  height: 50px;
  margin-top: 20px;
  text-align: center;
  background-color: #dc143c;
  color: white;
  &:disabled {
    background-color: rgba(128, 128, 128, 1);
  }
`;

export const RegisterSpan = styled.span`
  margin-top: 10px;
  color: white;
  font-size: 14px;
`;
export const RegisterLink = styled.span`
  margin-left: 5px;
  text-decoration: underline;
  cursor: pointer;
`;

export const Error = styled.span`
  color: white;
  background: red;
  padding: 5px 15px;
`;
