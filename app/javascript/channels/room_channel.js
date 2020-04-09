import consumer from "./consumer"

// consumer.subscriptions.create("RoomChannel", {
//   connected() {
//     // Called when the subscription is ready for use on the server
//     console.log("hello")
//   },

//   disconnected() {
//     // Called when the subscription has been terminated by the server
//   },

//   received(data) {
//     // Called when there's incoming data on the websocket for this channel
//     console.log("hello in data")
//     console.log(data);
//   },

//   broadcast: function() {
//     return this.perform('broadcast');
//   }
// });

document.addEventListener('turbolinks:load', function() {
  consumer.subscriptions.create({
      channel: "RoomChannel",
      room_id: document.getElementById('room_messages').getAttribute('data-room-id')
    }, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log("hello")
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
  
    received(data) {
      // Called when there's incoming data on the websocket for this channel
      data = JSON.parse(data.content);
      console.log(data);
      if (data.user_action == "play") {
        YT.get("player").seekTo(data.timestamp);
        YT.get("player").playVideo();
      }
      else if (data.user_action == "pause") {
        YT.get("player").seekTo(data.timestamp)
        YT.get("player").pauseVideo();
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
