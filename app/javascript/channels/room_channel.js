import consumer from "./consumer";

import {
    handleChannelResponse,
} from '../helpers/room/index/channel_handlers.js'

import {
    getRoomId,
    getUserId,
} from '../helpers/room/index/general.js'

document.addEventListener('turbolinks:load', function() {
    if (document.getElementById('room_id') != null) {
        consumer.subscriptions.create({
            channel: "RoomChannel",
            room_id: getRoomId(),
            user_id: getUserId()
        }, {
        connected() {
            // Called when the subscription is ready for use on the server
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
