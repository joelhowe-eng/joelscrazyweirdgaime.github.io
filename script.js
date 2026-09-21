// ==========================================
// CHANGE YOUR 6-DIGIT CODE HERE
// ==========================================
const ACCESS_CODE = "123456";
// ==========================================


const goButton = document.getElementById("goButton");
const unlockButton = document.getElementById("unlockButton");
const codeInput = document.getElementById("codeInput");
const codeMessage = document.getElementById("codeMessage");


// ----- CODE CHECK -----

unlockButton.addEventListener("click", () => {

    if (codeInput.value === ACCESS_CODE) {

        goButton.disabled = false;
        codeMessage.textContent = "Unlocked!";

        codeInput.disabled = true;
        unlockButton.disabled = true;

    } else {

        codeMessage.textContent = "Wrong code - try again.";
        codeInput.value = "";

    }

});


// Only allow numbers in the code box
codeInput.addEventListener("input", () => {
    codeInput.value = codeInput.value.replace(/\D/g, "");
});


// ----- EXISTING CHATAIGNE CONNECTION -----

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


// ----- GO BUTTON -----

goButton.addEventListener("click", () => {

    if (socket && socket.readyState === WebSocket.OPEN) {

        socket.send("GO");
        console.log("GO signal sent!");

    } else {

        console.error("Game relay is not connected.");
        alert("The game connection isn't ready yet. Try again.");

    }

});
