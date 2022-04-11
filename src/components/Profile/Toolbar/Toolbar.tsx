import React from "react";
import { Col } from "react-bootstrap";
import {
  ToolbarIncoming,
  ToolbarSended,
  ToolbarWriteMessage,
} from "./ToolbarOptions";

const Toolbar = () => {
  return (
    <Col md="3">
      <ToolbarWriteMessage />
      <ToolbarIncoming />
      <ToolbarSended />
    </Col>
  );
};

export default Toolbar;
