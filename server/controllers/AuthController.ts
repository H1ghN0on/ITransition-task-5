import express from "express";
import generateJWT from "../utils/generateJWT";

const { User } = require("../../models");

export type UserLoginData = {
  username: string;
  password: string;
  email: string;
};

type Status = {
  status: "OK" | "Error";
  user?: UserLoginData;
  message: string;
};

const checkEmailUnique = async (userEmail: string) => {
  const user = await User.findOne({
    where: {
      email: userEmail,
    },
  });
  return user == null ? true : false;
};

const checkUserNameUnique = async (userName: string) => {
  const user = await User.findOne({
    where: {
      username: userName,
    },
  });
  return user == null ? true : false;
};

const validateUnique = async (userData: UserLoginData): Promise<Status> => {
  if (!(await checkEmailUnique(userData.email))) {
    return {
      status: "Error",
      message: "This email is registered. Try another one",
    };
  }
  if (!(await checkUserNameUnique(userData.username))) {
    return {
      status: "Error",
      message: "This username is taken. Try another one",
    };
  }
  return { status: "OK", message: "" };
};

const addUserToDatabase = async (
  userData: UserLoginData
): Promise<Status | UserLoginData> => {
  try {
    const dbUser = await User.create(userData);
    const user = Object.assign(dbUser.dataValues, {
      token: generateJWT(dbUser),
    });
    return {
      status: "OK",
      user,
      message: "",
    };
  } catch (error) {
    return {
      status: "Error",
      message: "Some problems with DB",
    };
  }
};

class AuthController {
  getMe(req: express.Request, res: express.Response) {
    res.json(req.user);
  }
  async register(req: express.Request, res: express.Response) {
    const userData = req.body;
    const validation = await validateUnique(userData);
    if (validation.status === "OK") {
      const registerStatus = await addUserToDatabase(userData);
      res.send(registerStatus);
    } else {
      res.send(validation);
    }
  }

  async loginForPassport(login_username: string, login_password: string, done) {
    let dbUser = await User.findOne({
      where: {
        username: login_username,
        password: login_password,
      },
    });
    if (dbUser) {
      const user = Object.assign(dbUser.dataValues, {
        token: generateJWT(dbUser),
      });
      return done(null, { user, status: "OK", message: "" });
    } else {
      return done(null, { status: "Error", message: "Unknown user" });
    }
  }
}

export default new AuthController();
