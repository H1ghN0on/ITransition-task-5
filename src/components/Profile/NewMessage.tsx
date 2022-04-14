import Axios from "../../config/axios";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Error } from "../../styles/components";
import { useAppDispatch } from "../../redux/hooks";
import { addMessage } from "../../redux/messageSlice";
import socket from "../../config/socket";

interface InputValues {
  destination: string;
  topic: string;
  text: string;
}

const NewMessage = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = React.useState<string>("");
  const [inputValues, setInputValues] = React.useState<InputValues>({
    destination: "",
    topic: "",
    text: "",
  });

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  const clearFields = () => {
    Object.keys(inputValues).forEach((key) => {
      (inputValues as any)[key] = "";
    });
  };

  const checkEmptyness = () => {
    const capitalizeFirstLetter = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    let isNotEmpty = true;
    Object.keys(inputValues).forEach((key) => {
      if (!(inputValues as any)[key]) {
        setError(`Fill the ${capitalizeFirstLetter(key)} field`);
        isNotEmpty = false;
      }
    });
    return isNotEmpty;
  };

  const afterSend = (data: any) => {
    if (data.status === "OK") {
      setError("");
      dispatch(addMessage({ message: data.createdMessage, type: "sended" }));
      clearFields();
      socket.emit("send-message", data.createdMessage);
    } else {
      setError(data.message);
    }
  };

  const sendMessage = async () => {
    try {
      const { data } = await Axios().post("/message/add", {
        destination: inputValues.destination,
        topic: inputValues.topic,
        text: inputValues.text,
      });

      afterSend(data);
    } catch (error) {
      setError("Some problems");
    }
  };

  const handleSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (checkEmptyness()) {
      await sendMessage();
    }
  };
  return (
    <Col md="6">
      <Form>
        {error && <Error>{error}</Error>}
        <Form.Group className="mb-3" controlId="destination">
          <Form.Label>To</Form.Label>
          <Form.Control
            value={inputValues.destination}
            onChange={handleValueChange}
            name="destination"
            type="text"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="theme">
          <Form.Label>Topic</Form.Label>
          <Form.Control
            value={inputValues.topic}
            onChange={handleValueChange}
            name="topic"
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="theme">
          <Form.Label>Message</Form.Label>
          <Form.Control
            name="text"
            style={{ height: "300px", resize: "none" }}
            as="textarea"
            value={inputValues.text}
            onChange={handleValueChange}
          />
        </Form.Group>

        <Button onClick={handleSubmitClick} variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Col>
  );
};

export default NewMessage;
