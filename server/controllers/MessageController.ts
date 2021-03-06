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
  } catch (error) {
    console.log(error);
    return {
      status: "Error",
      message: "Problems with DB",
    };
  }
};

const separateMessages = async (messages: any, curUser: any) => {
  const incomed = await Promise.all(
    messages
      .filter((item: any) => item.destination === curUser.id)
      .map(async (result: any) => {
        result.dataValues.senderName = await getName(result, curUser, "sender");
        result.dataValues.destinationName = await getName(
          result,
          curUser,
          "destination"
        );
        return result.dataValues;
      })
  );

  const sended = await Promise.all(
    messages
      .filter((item: any) => item.sender === curUser.id)
      .map(async (result: any) => {
        result.dataValues.senderName = await getName(result, curUser, "sender");
        result.dataValues.destinationName = await getName(
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

const getName = async (
  message: any,
  curUser: any,
  type: "sender" | "destination"
) => {
  if (message[type] !== curUser.id) {
    const data = await findUser(message[type], "id");
    return data.user.username;
  } else {
    return curUser.username;
  }
};

const createMessageInDB = async (message: any, curUser: any) => {
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
      createdMessage.dataValues.senderName = await getName(
        createdMessage,
        curUser.username,
        "sender"
      );
      createdMessage.dataValues.destinationName = await getName(
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

const getAll = async (id: any) => {
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
      order: [["id", "DESC"]],
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
    const user = (req as any).user.data;
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
      Object.assign(req.body, { sender: (req as any).user.data.id }),
      (req as any).user.data
    );

    res.send(data);
  }
}

export default new MessageController();
