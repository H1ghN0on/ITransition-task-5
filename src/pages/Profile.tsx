import React from "react";
import { Container, Row } from "react-bootstrap";
import MessageList from "../components/Profile/Messages/MessageList";
import NewMessage from "../components/Profile/NewMessage";
import Toolbar from "../components/Profile/Toolbar/Toolbar";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setMessages } from "../redux/messageSlice";
import Axios from "../config/axios";
import { ToastContainer } from "react-toastify";

const Profile = () => {
  const dispatch = useAppDispatch();
  const activeFragment = useAppSelector(
    (state) => state.profileSlice.activeFragment
  );

  const incomedMessages = useAppSelector((state) => state.messageSlice.incomed);
  const sendedMessages = useAppSelector((state) => state.messageSlice.sended);

  const getAllUserMessages = async () => {
    try {
      const { data } = await Axios().get("/messages");
      if (data.status === "OK") {
        dispatch(setMessages({ incomed: data.incomed, sended: data.sended }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getAllUserMessages();
  }, []);

  const Fragment = () => {
    switch (activeFragment) {
      case "incoming": {
        return <MessageList messages={incomedMessages} />;
      }
      case "sended": {
        return <MessageList messages={sendedMessages} />;
      }
      case "write": {
        return <NewMessage />;
      }
    }
  };

  return (
    <>
      <Container>
        <Row md="12" className="justify-content-between">
          <Toolbar />
          <Fragment />
        </Row>
      </Container>
      <ToastContainer
        position="bottom-left"
        hideProgressBar={true}
        autoClose={5000}
      />
    </>
  );
};

export default Profile;
