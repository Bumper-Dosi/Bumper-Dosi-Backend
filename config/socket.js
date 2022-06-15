const { Server } = require("socket.io");
const chatRooms = require("../queries/chatRoom");

exports.loader = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "https://www.bumperdosi.com",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  let users = {};

  io.on("connection", (socket) => {
    console.log(`${socket.id} user connected`);
    console.log(`current connected user : ${io.engine.clientsCount}`);

    // Chat socket
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

    // Waiting Room socket
    socket.on("joinWorld", (userInfo) => {
      userInfo.socketId = socket.id;
      users[userInfo.socketId] = userInfo;
      socket.join("world");

      socket.broadcast.to("world").emit("joinWorld", userInfo);

      socket.on("noticeMe", (userInfo) => {
        userInfo.socketId = socket.id;
        socket.broadcast.to("world").emit("noticeMe", userInfo);
      });

      socket.on("userMovement", (data) => {
        data.socketId = socket.id;
        socket.broadcast.to("world").emit("userMovement", data);
      });
    });

    //GameRoom Socket
    socket.on("joinGame", (userInfo) => {
      userInfo.socketId = socket.id;
      users[userInfo.socketId] = userInfo;
      socket.join("gameRoom1");

      socket.broadcast.to("gameRoom1").emit("joinWorld", userInfo);

      socket.on("noticeMe", (userInfo) => {
        userInfo.socketId = socket.id;
        socket.broadcast.to("gameRoom1").emit("noticeMe", userInfo);
      });

      socket.on("userMovement", (data) => {
        data.socketId = socket.id;
        socket.broadcast.to("gameRoom1").emit("userMovement", data);
      });
    })

    socket.on("disconnect", () => {
      console.log("user disconnected");
      delete users[socket.id];
      socket.broadcast.emit("deletePlayer", { id: socket.id });
    });
  });
};
