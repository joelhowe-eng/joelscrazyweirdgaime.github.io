// ==========================================
// CHANGE YOUR 6-DIGIT CODE HERE
// ==========================================
const ACCESS_CODE = "342048";
// ==========================================

const goButton = document.getElementById("goButton");
const unlockButton = document.getElementById("unlockButton");
const codeInput = document.getElementById("codeInput");
const codeMessage = document.getElementById("codeMessage");

// CHECK THE CODE
unlockButton.addEventListener("click", function () {

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

// Only allow numbers
codeInput.addEventListener("input", function () {
    codeInput.value = codeInput.value.replace(/\D/g, "");
});

// Allow Enter key
codeInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        unlockButton.click();
    }
});


// ==========================================
// CHATAIGNE / WEBSOCKET
// ==========================================

let socket;

function connectToRelay() {

    socket = new WebSocket(
        "wss://tiny-silence-3ae5.joel-howe.workers.dev/websocket"
    );

    socket.addEventListener("open", function () {
        console.log("Connected to game relay!");
    });

    socket.addEventListener("close", function () {
        console.log("Disconnected - reconnecting...");
        setTimeout(connectToRelay, 2000);
    });

    socket.addEventListener("error", function (error) {
        console.error("WebSocket error:", error);
    });
}

connectToRelay();


// ==========================================
// GO BUTTON
// ==========================================

goButton.addEventListener("click", function () {

    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send("GO");
        console.log("GO signal sent!");
    } else {
        alert("The game connection isn't ready yet. Try again.");
    }

});
