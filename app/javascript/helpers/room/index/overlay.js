import {
    sendVideoMessage
} from './send_server_messages.js';

import {
    displayVideoError,
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

    document.getElementById("volume")
            .addEventListener("click", toggleVolumeRange);

    document.getElementById("volumeRange")
            .addEventListener("input", changeVolume);

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
        toggleVolumeRange(null, true);
    }
    document.getElementById('controls').style.visibility = show;
 }

 export const fadeControls = function(fade) {
    if (fade) {
        window.timeoutControls = setTimeout(toggleVideoControls, 2000, false);
    }
    else {
        clearTimeout(window.timeoutControls);
        toggleVideoControls(true);
    }
}

export const updateCurrentSongTime = function(timestamp=-1) {
    let player = YT.get('player');
    let currentTime = timestamp == -1 ? player.getCurrentTime() : timestamp;
    let currentTimeStr = secondsToString(currentTime);
    let duration = player.getDuration();
    let durationStr = secondsToString(duration);
    document.getElementById('curTime').innerText = currentTimeStr;
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

const toggleVolumeRange = function(event, forceHide=false) {
    if (forceHide == true) {
        var newVisibility = 'hidden';
    }
    else {
        const volumeRange = document.getElementById("volumeRange");
        const previousVisibility = volumeRange.style.visibility;
        var newVisibility = previousVisibility == 'visible' ? 'hidden' : 'visible';
    }
    volumeRange.style.visibility = newVisibility;
}

const overlayMouseOver = function() {
    if (!isVideoLoaded()) {
        displayVideoError("Enter YouTube Link!");
    }
    else {
        fadeControls(false);
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

const changeVolume = function(event) {
    let player = YT.get('player');
    let currentVolume = event.target.value;
    player.setVolume(currentVolume);
}

const controlVideo = function(event){
    let player = YT.get('player');
    if (isVideoLoaded()) {
        if (player.getPlayerState() == YT.PlayerState.PLAYING) {
            sendVideoMessage(player, 'pause');
        }
        else if (
            player.getPlayerState() == YT.PlayerState.PAUSED ||
            player.getPlayerState() == YT.PlayerState.CUED
        ) {
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

const secondsToString = function(seconds) {
    var datetime = new Date(seconds * 1000);
    // example input -> output (230.870204 -> 00:03:50)
    return datetime.toISOString().substr(11, 8);
}
