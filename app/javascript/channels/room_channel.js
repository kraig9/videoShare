import consumer from "./consumer"

document.addEventListener('turbolinks:load', function() {
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
         YT.get("player").seekTo(data.timestamp);
        if (data.user_action == "play") {
            handleVideoPlay();
        }
        else if (data.user_action == "pause") {
            handleVideoPause();
        }
        else if (data.user_action == "videoChange") {
            handleVideoChange(data.video_id);
        }
        else if (data.user_action == "chat"){
            handleChat(data.chat);
        }
        else {
            alert("Invalid Action!");
        }
    },
  
    broadcast: function() {
      return this.perform('broadcast');
    }
  });
});
