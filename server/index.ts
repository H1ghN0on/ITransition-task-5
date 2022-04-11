/* eslint-disable import/first */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "./config/db";
import { passport } from "./config/passport";
import cors from "cors";
import AuthController from "./controllers/AuthController";

const app = express();
const PORT = 3001;

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

app.post("/register", AuthController.register);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
