import express from "express";
import { Op } from "sequelize";

const { Message, User } = require("../../models");

const findUser = async (value: string | number, field: "id" | "username") => {
  try {
    const user = await User.findOne({ where: { [field]: value } });
    if (user) {
      return {
        status: "OK",
        user,
      };
    } else {
      return {
        status: "Error",
        message: "Unknown user",
      };
    }
    //TODO Print error about unknown user
  } catch (error) {
    console.log(error);
    return {
      status: "Error",
      message: "Problems with DB",
    };
  }
};

const separateMessages = async (messages, curUser) => {
  const incomed = await Promise.all(
    messages
      .filter((item) => item.destination === curUser.id)
      .map(async (result) => {
        result.dataValues.sender = await getName(result, curUser, "sender");
        result.dataValues.destination = await getName(
          result,
          curUser,
          "destination"
        );
        return result.dataValues;
      })
  );

  const sended = await Promise.all(
    messages
      .filter((item) => item.sender === curUser.id)
      .map(async (result) => {
        result.dataValues.sender = await getName(result, curUser, "sender");
        result.dataValues.destination = await getName(
          result,
          curUser,
          "destination"
        );
        return result.dataValues;
      })
  );

  return {
    incomed,
    sended,
  };
};

const getName = async (message, curUser, type: "sender" | "destination") => {
  if (message[type] !== curUser.id) {
    const data = await findUser(message[type], "id");
    return data.user.username;
  } else {
    return curUser.username;
  }
};

const createMessageInDB = async (message, curUser) => {
  try {
    const userStatus = await findUser(message.destination, "username");
    if (userStatus.status === "OK") {
      if (userStatus.user.id === curUser.id) {
        return {
          status: "Error",
          message: "You cannot send the message to yourself",
        };
      }
      const createdMessage = await Message.create({
        ...message,
        destination: userStatus.user.id,
      });
      createdMessage.sender = await getName(
        createdMessage,
        curUser.username,
        "sender"
      );
      createdMessage.destination = await getName(
        createdMessage,
        userStatus.user.username,
        "destination"
      );
      return {
        status: "OK",
        createdMessage,
      };
    } else {
      return userStatus;
    }
  } catch (error) {
    console.log(error);
    return {
      status: "Error",
      error: "Some problems with db",
    };
  }
};

const getAll = async (id) => {
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          {
            sender: id,
          },
          { destination: id },
        ],
      },
    });
    return {
      status: "OK",
      messages,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "Error",
      message: "Some problems with db",
    };
  }
};

class MessageController {
  async getAll(req: express.Request, res: express.Response) {
    const user = req.user.data;
    const data = await getAll(user.id);
    if (data.messages) {
      const { incomed, sended } = await separateMessages(data.messages, user);
      res.send({
        status: "OK",
        incomed,
        sended,
      });
    } else {
      res.send(data);
    }
  }

  async add(req: express.Request, res: express.Response) {
    const data = await createMessageInDB(
      Object.assign(req.body, { sender: req.user.data.id }),
      req.user.data
    );

    res.send(data);
  }
}

export default new MessageController();
