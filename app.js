const { Server } = require("socket.io");

const io = new Server(3000, { cors: { origin: "*" } });



// Listen for incoming socket connections
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Listen for a "message" event from the client
    socket.on("message", (data) => {
        console.log("Received message:", data);

        // Broadcast the message to all connected clients
        io.emit("message", data);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});