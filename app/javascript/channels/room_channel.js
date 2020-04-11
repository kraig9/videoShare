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
        room_id: getRoomId()
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
        if (data.current_user != getUserId()) {
            window.receivedPost = 1;
            YT.get("player").seekTo(data.timestamp);
            if (data.user_action == "play") {
                window.receivedPost++;
                YT.get("player").playVideo();
                // if (window.receivedPost == 0) {
                //     window.receivedPost = 2;
                //     YT.get("player").seekTo(data.timestamp);
                //     YT.get("player").playVideo();
                // }
                // else {
                //     window.receivedPost--;
                // }
               
            }
            else if (data.user_action == "pause") {
                window.receivedPost++;
                YT.get("player").pauseVideo();
                // (window.receivedPost != 0) {
                    // window.receivedPost = 1;
                    // YT.get("player").seekTo(data.timestamp);
                    // YT.get("player").pauseVideo();
                //}
            }
            else if (data.user_action == "videoChange") {
                console.log("Val++")
                window.receivedPost++;
                YT.get("player").cueVideoById(data.video_id);
            }
            else {
                alert("Invalid Action!");
            }
        }
    },
  
    broadcast: function() {
      return this.perform('broadcast');
    }
  });
});
