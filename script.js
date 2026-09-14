const goButton = document.getElementById("goButton");

let socket;

function connectToRelay() {
    socket = new WebSocket(
        "wss://tiny-silence-3ae5.joel-howe.workers.dev/websocket"
    );

    socket.addEventListener("open", () => {
        console.log("Connected to game relay!");
    });

    socket.addEventListener("close", () => {
        console.log("Disconnected from game relay.");

        // Try to reconnect after 2 seconds
        setTimeout(connectToRelay, 2000);
    });

    socket.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
    });
}

connectToRelay();

goButton.addEventListener("click", () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send("GO");
        console.log("GO signal sent!");
    } else {
        console.error("Game relay is not connected.");
        alert("The game connection isn't ready yet. Try again.");
    }
});
