import React from "react";
import { Box2 } from "react-bootstrap-icons";
import { useAppDispatch } from "../../../../redux/hooks";
import { setActiveFragment } from "../../../../redux/profileSlice";
import { Title, Wrapper } from "../../../../styles/Profile/toolbar";
import ToolbarOption from "../ToolbarOption";

const ToolbarIncoming = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setActiveFragment("incoming"));
  };

  return (
    <ToolbarOption>
      <Wrapper onClick={handleClick}>
        <Box2 />
        <Title className="ms-2">Incoming</Title>
      </Wrapper>
    </ToolbarOption>
  );
};

export default ToolbarIncoming;
