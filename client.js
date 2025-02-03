const { io } = require("socket.io-client");
const readline = require('readline')

const socket = io("ws://localhost:3000"); // Connect to WebSocket server


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

socket.on("message", (data) => {
    if (data.user !== socket.id) {
        console.log(`\n${data.user}: ${data.text}`);
    }
    promptUser();
})


const promptUser = () => {
    rl.question("You: ", (message) => {
        if (message.toLowerCase() === "exit") {
            console.log("Leaving chat...");
            socket.disconnect();
            rl.close();
            return;
        }
        socket.emit("message", { user: socket.id, text: message });
        promptUser();
    });
}


promptUser()