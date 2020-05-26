import consumer from "./consumer";

import {
    handleChannelResponse,
} from '../helpers/room/index/channelHandlers.js'

import {
    getRoomId,
} from '../helpers/room/index/general.js'

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
            handleChannelResponse(data)
        },
        broadcast: function() {
            return this.perform('broadcast');
            }
        });
    }
});
