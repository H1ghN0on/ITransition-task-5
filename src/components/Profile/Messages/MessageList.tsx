import React from "react";
import { Col } from "react-bootstrap";
import { useAppSelector } from "../../../redux/hooks";
import Message from "./Message";
import moment from "moment";

interface MessageType {
  id: number;
  topic: string;
  sender: string;
  text: string;
  date: string;
  destination: string;
  createdAt: string;
}

interface MessageListProps {
  messages: MessageType[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const activeFragment = useAppSelector(
    (state) => state.profileSlice.activeFragment
  );

  const addZeroToDate = (time: number) => {
    return time >= 10 ? time : "0" + time;
  };

  const formatDate = (time: string) => {
    const date = moment(time);
    return `${addZeroToDate(date.date())}.${addZeroToDate(
      date.month()
    )}.${moment(time).year()} ${addZeroToDate(date.hours())}:${addZeroToDate(
      date.minutes()
    )}`;
  };
  return (
    <Col md="6">
      {messages &&
        messages.map((message: MessageType) => (
          <Message
            key={message.id}
            topic={message.topic}
            sender={
              activeFragment === "incoming"
                ? message.sender
                : message.destination
            }
            date={formatDate(message.createdAt)}
            text={message.text}
          />
        ))}
    </Col>
  );
};

export default MessageList;
