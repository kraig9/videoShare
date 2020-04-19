import consumer from "./consumer"

document.addEventListener('turbolinks:load', function() {
    if (document.getElementById('room_id') != null) {
        consumer.subscriptions.create({
            channel: "RoomChannel",
            room_id: getRoomId()
        }, {
        connected() {
            // Called when the subscription is ready for use on the server
            console.log("Connected!")
        },
        disconnected() {
            // Called when the subscription has been terminated by the server
        },
        received(data) {
            // Called when there's incoming data on the websocket for this channel
            data = JSON.parse(data.content);
            console.log(data);
            if (data.user_action == "play") {
                handleVideoPlay(data.timestamp);
            }
            else if (data.user_action == "pause") {
                handleVideoPause(data.timestamp);
            }
            else if (data.user_action == "videoChange") {
                handleVideoChange(data.video_id);
            }
            else if (data.user_action == "chat"){
                handleChat(data.chat, data.time, data.id, data.name);
            }
            else {
                alert("Invalid Action!");
            }
        },
        broadcast: function() {
            return this.perform('broadcast');
            }
        });
    }
});
