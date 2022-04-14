import React from "react";
import { Col, Row } from "react-bootstrap";
import { Sender, Topic, Date } from "../../../styles/Profile/messages";
import MessageBody from "./MessageBody";

interface MessageProps {
  sender: string;
  topic: string;
  date: string;
  text: string;
}

const Message: React.FC<MessageProps> = ({ sender, topic, date, text }) => {
  const [active, setActive] = React.useState<boolean>(false);

  return (
    <>
      <Row className="justify-content-center mt-1">
        <Col
          onClick={() => {
            setActive(!active);
          }}
          md="12"
          className="d-flex flex-column text-wrap rounded border border-dark px-4 py-2 "
        >
          <div className="d-flex justify-content-between">
            <Sender>{sender}</Sender>
            <Date>{date}</Date>
          </div>
          <Topic>{topic}</Topic>
          {active && <MessageBody text={text} />}
        </Col>
      </Row>
    </>
  );
};

export default Message;
