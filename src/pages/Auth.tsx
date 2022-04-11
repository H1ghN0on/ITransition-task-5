import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";

import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useAppDispatch } from "../redux/hooks";
import { setToken } from "../redux/tokenSlice";

const Background = styled.div`
  background-image: url("/background.jpeg");
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export type AuthFragment = {
  handleFooterClick: () => void;
  redirectToProfile: (token: string) => void;
};

const Auth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [activeFragment, setActiveFragment] = React.useState<
    "login" | "register"
  >("login");

  const redirectToProfile = (token: string) => {
    Cookies.set("token", token);
    dispatch(setToken(token));
    navigate("/profile");
  };

  const Fragment = () => {
    switch (activeFragment) {
      case "login": {
        return (
          <Login
            redirectToProfile={redirectToProfile}
            handleFooterClick={() => {
              setActiveFragment("register");
            }}
          />
        );
      }
      case "register": {
        return (
          <Register
            redirectToProfile={redirectToProfile}
            handleFooterClick={() => {
              setActiveFragment("login");
            }}
          />
        );
      }
    }
  };

  return (
    <div className="App">
      <Background>
        <Container fluid>
          <Row className="d-flex justify-content-center align-items-center vh-100">
            <Col xs="10" sm="8" lg="6" xl="4" className="rounded p-4">
              <Fragment />
            </Col>
          </Row>
        </Container>
      </Background>
    </div>
  );
};

export default Auth;
