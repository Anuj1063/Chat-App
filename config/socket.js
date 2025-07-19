const { Server } = require("socket.io");

const userSocketMap = {}; // { userId: socketId }
let ioInstance;

function setupSocket(server) {
  ioInstance = new Server(server, {
    cors: { origin: "*" },
  });

  ioInstance.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("🔌 User connected:", socket.id);

    if (userId) {
      userSocketMap[userId] = socket.id;
      ioInstance.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    socket.on("sendMessage", ({ to, message }) => {
      const receiverSocketId = userSocketMap[to];
      if (receiverSocketId) {
        ioInstance.to(receiverSocketId).emit("receiveMessage", message);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      if (userId) {
        delete userSocketMap[userId];
        ioInstance.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
  });
}

function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

function getIO() {
  return ioInstance;
}

module.exports = {
  setupSocket,
  getReceiverSocketId,
  getIO,
  userSocketMap
};
