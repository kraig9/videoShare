import {
    secondsToString,
} from '../index/general.js';

import {
    sendVideoMessage
} from './send_server_messages.js';

import {
    displayError,
    hideError,
} from '../index/video_form.js';

import {
    isVideoLoaded
} from './video_form.js';

export const initializeOverlay = function() {
    // hide video controls
    toggleVideoControls(false);

    document.getElementById('overlay')
            .addEventListener('mouseover', overlayMouseOver);

    document.getElementById('overlay')
            .addEventListener('mouseout', overlayMouseOut);

    document.getElementById('overlay')
            .addEventListener('click', controlVideo);

    document.getElementById("play")
            .addEventListener("click", controlVideo);

    document.getElementById("volUp")
            .addEventListener("click", increaseVolume);

    document.getElementById("volDown")
            .addEventListener("click", decreaseVolume);

    document.getElementById("seek")
            .addEventListener("click", seekVideo);

    document.getElementById("fullscreen")
            .addEventListener("click", playFullScreen);

    document.getElementById("controls")
            .addEventListener("mouseover", () => {
                fadeControls(false);
            });
}

export const togglePlayButton = function(showPlay) {
    if (showPlay) {
        document.getElementById("playIcon").className = "fas fa-play";
    }
    else {
        document.getElementById("playIcon").className = "fas fa-pause";
    }
}

export const toggleVideoControls = function(show) {
    if (show) {
        show = 'visible';
    }
    else {
        show = 'hidden';
    }
    document.getElementById('controls').style.visibility = show;
 }

 export const fadeControls = function(fade) {
    if (fade) {
        window.timeoutControls = setTimeout(toggleVideoControls, 2000, false);
    }
    else {
        clearTimeout(window.timeoutControls);
        toggleVideoControls(true)
    }
}

export const updateCurrentSongTime = function(timestamp=-1) {
    let player = YT.get('player');
    let currentTime = timestamp == -1 ? player.getCurrentTime() : timestamp;
    let currentTimeStr = secondsToString(currentTime);
    let duration = player.getDuration();
    let durationStr = secondsToString(duration);
    document.getElementById("curTime").innerText = currentTimeStr;
    document.getElementById('totTime').innerText = durationStr;
    let progressBar = document.getElementById("progressBar");
    if (duration == 0) {
        // avoid divide by 0
        duration = 1;
    }
    let progress = (currentTime / duration) * 100;
    progressBar.setAttribute("aria-valuenow", progress);
    progressBar.style.width = `${progress}%`;
}

const overlayMouseOver = function() {
    if (!isVideoLoaded()) {
        displayError('Enter Youtube Link!')
    }
    else {
        fadeControls(false)
    }
}

const overlayMouseOut = function() {
    if (!isVideoLoaded()) {
        hideError();
    }
    else {
        fadeControls(true);
    }
}

const decreaseVolume = function() {
    let player = YT.get('player');
    let currentVolume = player.getVolume();
    if (currentVolume != 0) {
        player.setVolume(currentVolume - 10);
    }
}

const increaseVolume = function() {
    let player = YT.get('player');
    let currentVolume = player.getVolume();
    if (currentVolume != 100) {
        player.setVolume(currentVolume + 10);
    }
}

const controlVideo = function(event){
    let player = YT.get('player');
    if (isVideoLoaded()) {
        if (player.getPlayerState() == YT.PlayerState.PLAYING) {
            sendVideoMessage(player, 'pause');
        }
        else if (player.getPlayerState() == YT.PlayerState.PAUSED || player.getPlayerState() == YT.PlayerState.CUED) {
            sendVideoMessage(player, 'play');
        }
    }
}

 const seekVideo = function(event) {
    let holderX = document.getElementById('holder').offsetLeft;
    let x = event.pageX - this.offsetLeft - holderX;
    let clickedPosition = x / this.offsetWidth;
    let player = YT.get('player')
    let videoPosition = clickedPosition * player.getDuration();
    if (player.getPlayerState() == YT.PlayerState.PAUSED) {
        sendVideoMessage(player, "pause", videoPosition);
    }
    else {
        sendVideoMessage(player, "play", videoPosition);
    }
}

const playFullScreen = function() {
    let player = document.getElementById('player');
    let requestFullScreen = player.requestFullScreen || player.mozRequestFullScreen || player.webkitRequestFullScreen;
    if (requestFullScreen) {
        requestFullScreen.bind(player)();
    }
}
