const socket = io();

const username = prompt("Nhập tên của bạn:");

socket.emit("join", username);

const form = document.getElementById("chat-form");
const input = document.getElementById("msg");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if(input.value.trim() !== ""){
        socket.emit("chatMessage", input.value);
        input.value = "";
    }
});

socket.on("message", (data) => {

    const div = document.createElement("div");
    div.classList.add("message");

    div.innerHTML = `
        <strong>${data.user}</strong><br>
        ${data.text}
    `;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
});
