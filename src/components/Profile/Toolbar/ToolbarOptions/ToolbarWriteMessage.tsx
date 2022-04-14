import React from "react";
import { Pencil } from "react-bootstrap-icons";
import { useAppDispatch } from "../../../../redux/hooks";
import { setActiveFragment } from "../../../../redux/profileSlice";
import { Title, Wrapper } from "../../../../styles/Profile/toolbar";
import ToolbarOption from "../ToolbarOption";

const ToolbarWriteMessage = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setActiveFragment("write"));
  };

  return (
    <ToolbarOption>
      <Wrapper onClick={handleClick}>
        <Pencil />
        <Title className="ms-2">Write message</Title>
      </Wrapper>
    </ToolbarOption>
  );
};

export default ToolbarWriteMessage;
