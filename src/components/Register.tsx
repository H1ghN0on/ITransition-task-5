import React from "react";

import {
  Title,
  Input,
  Submit,
  RegisterSpan,
  RegisterLink,
  Error,
} from "../styles/components";
import { AuthFragment } from "../pages/Auth";
import Axios from "../config/axios";

type InputRegisterType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC<AuthFragment> = ({
  handleFooterClick,
  redirectToProfile,
}) => {
  const [error, setError] = React.useState<string>("");
  const [inputValues, setInputValues] = React.useState<InputRegisterType>({
    username: "1",
    password: "1",
    email: "mem@ma.ru",
    confirmPassword: "1",
  });

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateValues()) {
      setError("");
      const requestData = {
        username: inputValues.username,
        password: inputValues.password,
        email: inputValues.email,
      };
      try {
        const { data } = await Axios().post("/register", requestData);
        if (data.status === "Error") {
          setError(data.message);
        } else {
          redirectToProfile(data.user.token);
        }
      } catch (error) {
        setError("Something gone wrong");
      }
    }
  };

  const validateValues = () => {
    if (!checkPasswordMatch() || !checkEmail()) {
      return false;
    }
    return true;
  };

  const checkPasswordMatch = () => {
    if (inputValues.password !== inputValues.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const checkEmail = () => {
    const emailRegEx = /^\S+@\S+\.\S+$/;
    if (!emailRegEx.test(inputValues.email)) {
      setError("Specify correct email");
      return false;
    }
    return true;
  };

  return (
    <>
      <Title className="text-center">Register</Title>
      {error && (
        <Error className="d-flex justify-content-center">{error}</Error>
      )}
      <form className="d-flex flex-column justify-content-center">
        <Input
          name="username"
          onChange={handleValueChange}
          type="text"
          value={inputValues.username}
          placeholder="Username"
        />
        <Input
          name="email"
          onChange={handleValueChange}
          type="email"
          value={inputValues.email}
          placeholder="Email"
        />
        <Input
          name="password"
          onChange={handleValueChange}
          type="password"
          value={inputValues.password}
          placeholder="Password"
        />
        <Input
          name="confirmPassword"
          onChange={handleValueChange}
          type="password"
          value={inputValues.confirmPassword}
          placeholder="Verify password"
        />
        <Submit
          disabled={Object.values(inputValues)
            .map((obj: string) => obj.trim())
            .includes("")}
          onClick={handleSubmitClick}
          type="submit"
        >
          Register
        </Submit>
      </form>
      <RegisterSpan className="d-flex justify-content-center">
        Already have an account?
        <RegisterLink onClick={handleFooterClick}>Log in</RegisterLink>
      </RegisterSpan>
    </>
  );
};

export default Register;
