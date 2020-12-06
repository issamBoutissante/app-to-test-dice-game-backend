const socket = require("socket.io-client")("http://localhost:5000");
const express = require("express");
const app = express();
let isHoster = true;
let name = "issam";
let FriendName;
let RoomId;

app.get("/", (req, res) => {
  res.send("hello issam from front end server");
});

//whene game started
socket.on("GameStarted", ({ hosterName, friendName }) => {
  if (isHoster) {
    FriendName = friendName;
  } else {
    FriedName = hosterName;
  }
  console.log(`${name} and ${FriendName} are playing on room ${RoomId}`);
});

//set listeners
//on player started a new game
socket.emit("startNewGame", { name }, ({ roomId }) => {
  console.log(`${name} started new game....`);
  RoomId = roomId;
  console.log(`your id is ${RoomId}`);
  socket.on("joinRequest", ({ name }) => {
    console.log(`${name} asked to join the game`);
    let isAccepted = true;
    socket.emit("requestAnswer", { isAccepted });
  });
  //i put the join trigger just for test
  socket.emit("joinGame", { name, roomId: RoomId }, ({ error }) => {
    if (error) console.log(error);
  });
});
//on player joined a game

//start New Game
//join game

app.listen("3000", () => {
  console.log("frontend server started listening");
});
