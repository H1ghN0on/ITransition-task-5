import React from "react";
import { Send } from "react-bootstrap-icons";
import { useAppDispatch } from "../../../../redux/hooks";
import { setActiveFragment } from "../../../../redux/profileSlice";
import { Title, Wrapper } from "../../../../styles/Profile/toolbar";
import ToolbarOption from "../ToolbarOption";

const ToolbarSended = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setActiveFragment("sended"));
  };

  return (
    <ToolbarOption>
      <Wrapper onClick={handleClick}>
        <Send />
        <Title className="ms-2">Sended</Title>
      </Wrapper>
    </ToolbarOption>
  );
};

export default ToolbarSended;
