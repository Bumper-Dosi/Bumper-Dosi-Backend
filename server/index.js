const http = require("http");
const port = process.env.PORT;
const socket = require("../config/socket");

const connectServer = (app) => {
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });

  socket.loader(server);
};

module.exports = connectServer;
