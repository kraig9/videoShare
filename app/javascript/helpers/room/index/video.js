
import {
    displayError,
} from './general.js';

import {
    updateCurrentSongTime,
} from './overlay.js';

import {
    sendChangeVideo,
} from './send_server_messages.js';

let prevState = 6;

export const initializeVideo = function() {
    document.getElementById("changeVideo")
            .addEventListener("click", changeVideo);
}

export const initializeTime = function(event) {
    let state = YT.get('player').getPlayerState();
    if (prevState == YT.PlayerState.UNSTARTED && state == YT.PlayerState.CUED) {
        updateCurrentSongTime();
    }
    prevState = state;
}

export const isVideoLoaded = function() {
    return YT.get('player').getVideoUrl() != 'https://www.youtube.com/watch';
}

const changeVideo = function() {
    const player = YT.get('player');
    let videoUrl = document.getElementById('videoLink').value;
    let splitUrl = videoUrl.split("=");
    // JavaScript has short-circuit evaluation so
    // it will not evalutate the second part of
    // the expression if the first is false
    if (splitUrl.length > 1 && splitUrl[1].length >= 11) {
        let videoId = splitUrl[1].substr(0, 11);
        sendChangeVideo(player, videoId);
        return;
    }
    displayError('Invalid Youtube URL!')
}
