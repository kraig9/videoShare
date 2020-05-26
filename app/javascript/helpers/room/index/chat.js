import {
    onEnterDoButtonClick,
} from '../../general.js';

import {
    sendChatMessage,
} from './send_server_messages.js';

export const initializeChat = function() {
    document.getElementById('sendChat')
            .addEventListener('click', chat);
    document.getElementById('message')
            .addEventListener('keydown', onEnterDoButtonClick("sendChat"));
}

export const addChat = function(message, time, isSelf=true, user='') {
    let className = "msg other";
    if (isSelf) {
        user = 'You';
        className = "msg";
    }
    time = new Date(time * 1000).toLocaleTimeString().padStart(11, '0').substr(0, 5);
    let newMessage = document.createElement("div");
    newMessage.className = className;
    newMessage.innerHTML =
        `<strong>${user}</strong>
        <p class="my-0">${message}</p>
        <span>${time}</span>`;
    document.getElementById("scroll").appendChild(newMessage);
    newMessage.scrollIntoView();
}

const chat = function(event) {
    let message = document.getElementById("message").value;
    if (message.trim() != "") {
        sendChatMessage(message);
    }
    document.getElementById("message").value = "";
}
