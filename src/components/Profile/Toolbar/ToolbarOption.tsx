import React from "react";
import { Col, Row } from "react-bootstrap";

interface ToolbarOptionProps {
  children: JSX.Element;
}

const ToolbarOption: React.FC<ToolbarOptionProps> = ({ children }) => {
  return (
    <Row className="mt-1">
      <Col
        md="12"
        className="d-flex flex-column rounded-pill border border-dark p-2 ps-3"
      >
        {children}
      </Col>
    </Row>
  );
};

export default ToolbarOption;
