const { Server } = require("socket.io");
const chatRooms = require("../queries/chatRoom");

exports.loader = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("chatRoom", async ({ users }) => {
      const roomId = users.sort().join("");
      const chatRoom = await chatRooms.findOrCreateChatRoom({
        user: users[0],
        friend: users[1],
      });

      socket.emit("prevMessages", { contents: chatRoom.contents });
      socket.join(roomId); // uid기반 특정한 룸네임
    });

    socket.on("message", (message) => {
      console.log(message);
      io.to(message.roomName).emit("message", message.message);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
