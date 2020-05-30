import {
    addChat,
} from './chat.js';

import {
    getUserId
} from './general.js';

import {
    fadeControls,
    togglePlayButton,
    toggleVideoControls,
    updateCurrentSongTime,
} from './overlay.js';

export const handleChannelResponse = function(response) {
    let data = JSON.parse(response.content);
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
        console.error(data);
    }
}

let intervalUpdateTime = null;

const handleChat = function(message, time, id, name) {
    if (id == getUserId()) {
        addChat(message, time);
    }
    else {
        addChat(message, time, false, name);
    }
}

const handleVideoChange = function(videoId) {
    YT.get("player").cueVideoById(videoId);
    toggleVideoControls(true);
    resetInterval();
}

const handleVideoPause = function(timestamp) {
    YT.get("player").seekTo(timestamp, true);
    YT.get("player").pauseVideo();
    togglePlayButton(true);
    resetInterval();
    updateCurrentSongTime(timestamp);
}

const handleVideoPlay = function(timestamp) {
    YT.get("player").seekTo(timestamp);
    YT.get("player").playVideo();
    togglePlayButton(false);
    if (intervalUpdateTime == null) {
        intervalUpdateTime = setInterval(updateCurrentSongTime, 90);
    }
}

const resetInterval = function() {
    clearInterval(intervalUpdateTime);
    intervalUpdateTime = null;

}
