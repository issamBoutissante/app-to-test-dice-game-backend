const io = require("socket.io-client")("http://localhost:5000");
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("hello issma from front end server");
});
//set listeners
io.on("joinRequest", ({ friendName }) => {
  console.log(`${friendName} asked to join the game`);
  io.emit("requestAccepted", { friendName }, ({ message }) => {
    console.log(message);
  });
  io.emit("requestDenied", ({ message }) => {
    console.log(message);
  });
});
io.on("GameStarted", ({ hosterName, friendName, roomId }) => {
  console.log(`${hosterName} and ${friendName} are playing on room ${roomId}`);
});
//start New Game
let hosterName = "issame";
let roomId = "";
io.emit("startNewGame", { hosterName }, ({ roomId }) => {
  roomId = roomId;
  console.log(roomId);
  io.emit("joinGame", { friendName, roomId });
});
let friendName = "Chaimae";
//join game

app.listen("3000", () => {
  console.log("frontend server started listening");
});
