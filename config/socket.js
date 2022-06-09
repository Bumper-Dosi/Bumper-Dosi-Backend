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
      socket.join(roomId);
    });

    socket.on("message", async (content) => {
      const user = content.user;
      const friend = content.roomName.replace(user, "");

      socket.to(content.roomName).emit("message", content);
      await chatRooms.updateChatRoom({ user, friend, message: content });
    });

    socket.on("save messages", async ({ contents }) => {
      await chatRooms.saveChatRoom(contents);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
