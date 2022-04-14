import React from "react";

interface MessageBodyProps {
  text: string;
}

const MessageBody: React.FC<MessageBodyProps> = ({ text }) => {
  return <>{text}</>;
};

export default MessageBody;
