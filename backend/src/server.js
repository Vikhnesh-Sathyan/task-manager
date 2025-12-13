const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const app = require("./app");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
});

mongoose.connect("mongodb://localhost:27017/")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

server.listen(5000, () => {
  console.log("Backend running on port 5000");
});

module.exports = { io };
