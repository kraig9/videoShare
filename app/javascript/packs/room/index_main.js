//needed for receiving broadcasted messages

import {
    initializeChat,
} from '../../helpers/room/index/chat.js';

import {
    initializeOverlay,
} from '../../helpers/room/index/overlay.js';

import {
    makePostRequest
} from '../../helpers/sendRequest.js';

import {
    initializeTime,
    initializeVideo,
} from '../../helpers/room/index/video.js';

window.onload = function() {
    new YT.Player('player', {
        playerVars: {
            controls: 0,
            rel: 0,
        },
        events: {
            'onStateChange': initializeTime
        }
    });
    // window.addEventListener('beforeunload', handleUserLeaving);
    initializeOverlay();
    initializeVideo();
    initializeChat();
}

const handleUserLeaving = function(e) {
    e.returnValue = 'Leaving Room!';
    makePostRequest('/user/leaveroom');
}
