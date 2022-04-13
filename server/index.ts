/* eslint-disable import/first */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "./config/db";
import { passport } from "./config/passport";
import cors from "cors";
import AuthController from "./controllers/AuthController";
import MessageController from "./controllers/MessageController";

const app = express();
const PORT = 3001;

const server = require("http").Server(app);

const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", passport.authenticate("local"), AuthController.getMe);

app.get("/messages", passport.authenticate("jwt"), MessageController.getAll);
app.post("/message/add", passport.authenticate("jwt"), MessageController.add);

app.post("/register", AuthController.register);

const users = {};

io.on("connection", (socket) => {
  socket.on("connected", (id) => {
    users[id] = socket.id;
    console.log(users);
  });

  socket.on("send-message", (message) => {
    console.log("wtf");
    socket.to(users[message.destination]).emit("get-message", {
      message: message,
    });
  });

  socket.on("disconnet", () => {
    console.log("goodbye");
  });
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
