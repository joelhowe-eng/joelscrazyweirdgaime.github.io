// ==========================================
// ACCESS CODE
// ==========================================
const ACCESS_CODE = "340248";

const goButton = document.getElementById("goButton");
const unlockButton = document.getElementById("unlockButton");
const codeInput = document.getElementById("codeInput");
const codeMessage = document.getElementById("codeMessage");

function checkCode() {

    // Remove spaces or anything that isn't a number
    const enteredCode = String(codeInput.value)
        .replace(/\D/g, "")
        .trim();

    console.log("Entered:", enteredCode);
    console.log("Expected:", ACCESS_CODE);

    if (enteredCode === ACCESS_CODE) {

        goButton.disabled = false;
        codeMessage.textContent = "✅ Unlocked!";

        codeInput.disabled = true;
        unlockButton.disabled = true;

    } else {

        codeMessage.textContent =
            "❌ Wrong code. You entered: " + enteredCode;

    }
}

unlockButton.addEventListener("click", checkCode);

codeInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
});

codeInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkCode();
    }
});

// ==========================================
// CHATAIGNE / WEBSOCKET
// ==========================================
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
