//needed for receiving broadcasted messages

import {
    initializeChat,
} from '../../helpers/room/index/chat.js';

import {
    initializeOverlay,
} from '../../helpers/room/index/overlay.js';

import {
    initializeTime,
    initializeVideoForm,
} from '../../helpers/room/index/video_form.js';

window.onload = function() {
    new YT.Player('player', {
        playerVars: {
            controls: 0,
            rel: 0,
        },
        events: {
            'onReady': onYouTubePlayerReady,
            'onStateChange': initializeTime,
        }
    });
}

// wait until YouTube Player is ready before initializing elements
const onYouTubePlayerReady = function(event) {
    initializeOverlay();
    initializeVideoForm();
    initializeChat();
}