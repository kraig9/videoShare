window.prevState = 6;

window.onYouTubeIframeAPIReady = function() {
    new YT.Player('player', {
        playerVars: {
            controls: 0,
            rel: 0,
        },
        events: {
            'onStateChange': initializeTime
        }
    });
    initializeButtons()
}

window.initializeButtons = function() {
    window.addEventListener('beforeunload', handleUserLeaving);
    document.getElementById('overlay').addEventListener('mouseover', overlayMouseOver);
    document.getElementById('overlay').addEventListener('mouseout', overlayMouseOut);
    document.getElementById("overlay").addEventListener("click", controlVideo);
    document.getElementById("play").addEventListener("click", controlVideo);
    document.getElementById("volUp").addEventListener("click", increaseVolume);
    document.getElementById("volDown").addEventListener("click", decreaseVolume);
    document.getElementById("changeVideo").addEventListener("click", changeVideo);
    document.getElementById("seek").addEventListener("click", seekVideo);
    document.getElementById("fullscreen").addEventListener("click", playFullScreen);
    document.getElementById("sendChat").addEventListener("click", chat);
    document.getElementById("message").addEventListener("keydown", function(event){
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("sendChat").click();
        }
    });
    document.getElementById("controls").addEventListener("mouseover", function() {
        fadeControls(false);
    })
    toggleVideoControls(false);
}

window.decreaseVolume = function() {
    var player = YT.get('player');
    var currentVolume = player.getVolume();
    if (currentVolume != 0) {
        player.setVolume(currentVolume - 10);
    }
}

window.handleUserLeaving = function(e) {
    makePostRequest('/user/leaveroom');
}

window.increaseVolume = function() {
    var player = YT.get('player');
    var currentVolume = player.getVolume();
    if (currentVolume != 100) {
        player.setVolume(currentVolume + 10);
    }
}

window.overlayMouseOver = function() {
    var player = YT.get('player');
    if (!videoLoaded()) {
        displayError(`<i class="fas fa-arrow-left"></i> Enter Youtube Link!`)
    }
    else {
        fadeControls(false)
    }
}

window.overlayMouseOut = function() {
    if (!videoLoaded()) {
        document.getElementById("error").innerHTML = '';
    }
    else {
        fadeControls(true);
    }
}

window.fadeControls = function(fade) {
    if (fade) {
        window.timeoutControls = setTimeout(toggleVideoControls, 2000, false);
    }
    else {
        clearTimeout(window.timeoutControls);
        toggleVideoControls(true)
    }
}

window.videoLoaded = function() {
    return YT.get('player').getVideoUrl() != 'https://www.youtube.com/watch';
}

window.displayError = function (message) {
    document.getElementById("error").innerHTML =
        `<div class="alert alert-danger alert-dismissable m0 fade show" role="alert">`
            + message +
            `<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
}

window.sendVideoMessage = function(player, action, time=-1) {
    if (time == -1) {
        time = player.getCurrentTime();
    }
    makePostRequest('/user/timestamp', {
        "timestamp": time,
        "user_action": action
    });
}

window.controlVideo = function(event){
    var player = YT.get('player');
    if (videoLoaded()) {
        if (player.getPlayerState() == YT.PlayerState.PLAYING) {
            sendVideoMessage(player, "pause");
        }
        else if (player.getPlayerState() == YT.PlayerState.PAUSED || player.getPlayerState() == YT.PlayerState.CUED) {
            sendVideoMessage(player, "play");
        }
    }
}

window.getRoomId = function() {
    return document.getElementById('room_id').getAttribute('data-room-id');
}

window.getUserId = function() {
    return document.getElementById('user_id').title;
}

window.sendChangeVideo = function(player, videoId) {
    makePostRequest('/user/videochange', {
        "user_action": "videoChange",
        "video_id": videoId
    });
}

window.changeVideo = function() {
    var player = YT.get('player');
    var videoUrl = document.getElementById('videoLink').value;
    var splitUrl = videoUrl.split("=");
    if (splitUrl.length > 1) {
        // if (splitUrl[0] == "https://www.youtube.com/watch?v") {
            if (splitUrl[1].length >= 11) {
                var videoId = splitUrl[1].substr(0, 11);
                sendChangeVideo(player, videoId);
                return;
            }
        // }
    }
    displayError('Invalid Youtube URL!')
 }

 window.playFullScreen = function() {
    var player = document.getElementById('player');
    var requestFullScreen = player.requestFullScreen || player.mozRequestFullScreen || player.webkitRequestFullScreen;
    if (requestFullScreen) {
        requestFullScreen.bind(player)();
    }
 }

 window.toggleVideoControls = function(show) {
    if (show) {
        show = "visible";
    }
    else {
        show = "hidden";
    }
    document.getElementById('controls').style.visibility = show;
 }

 window.togglePlayButton = function(showPlay) {
     if (showPlay) {
         document.getElementById("playIcon").className = "fas fa-play";
     }
     else {
         document.getElementById("playIcon").className = "fas fa-pause";
     }
 }

 window.handleVideoChange = function(videoId) {
    YT.get("player").cueVideoById(videoId);
    toggleVideoControls(true);
    fadeControls(true);
 }

 window.handleVideoPause = function(timestamp) {
     YT.get("player").seekTo(timestamp);
     YT.get("player").pauseVideo();
     togglePlayButton(true);
     clearInterval(window.intervalUpdateTime)
 }

 window.handleVideoPlay = function(timestamp) {
     YT.get("player").seekTo(timestamp);
     YT.get("player").playVideo();
     togglePlayButton(false);
    window.intervalUpdateTime = setInterval(continuoslyUpdateCurrentSongTime, 90);
 }

 window.continuoslyUpdateCurrentSongTime = function() {
    updateCurrentSongTime();
}

window.updateCurrentSongTime = function() {
    var player = YT.get('player');
    var currentTime = secondsToString(player.getCurrentTime());
    var duration = secondsToString(player.getDuration());
    document.getElementById("curTime").innerText = currentTime;
    document.getElementById('totTime').innerText = duration;
    var progressBar = document.getElementById("progressBar");
    var progress = (player.getCurrentTime() / player.getDuration()) * 100
    progressBar.setAttribute("aria-valuenow", progress);
    progressBar.style.width = `${progress}%`;
}

window.initializeTime = function(event) {
    var state = YT.get('player').getPlayerState()
    if (window.prevState == YT.PlayerState.UNSTARTED && state == YT.PlayerState.CUED) {
        updateCurrentSongTime();

    }
    window.prevState = state;
}

window.seekVideo = function(event) {
    var holderX = document.getElementById('holder').offsetLeft;
    var x = event.pageX - this.offsetLeft - holderX;
    var clickedPosition = x / this.offsetWidth;
    var player = YT.get('player')
    var videoPosition = clickedPosition * player.getDuration();
    if (player.getPlayerState() == YT.PlayerState.PAUSED) {
        sendVideoMessage(player, "pause", videoPosition);
    }
    else {
        sendVideoMessage(player, "play", videoPosition);
    }
}

window.sendChatMessage = function(message) {
    makePostRequest('/user/chatpost', {
        "user_action": "chat",
        "chat": message
    })
}

window.chat = function(event) {
    var message = document.getElementById("message").value;
    if (message.trim() != "") {
        sendChatMessage(message);
    }
    document.getElementById("message").value = "";
}

window.addChat = function(message, time, isSelf=true, user='') {
    var className = "msg other";
    if (isSelf) {
        user = 'You';
        className = "msg";
    }
    time = new Date(time * 1000).toLocaleTimeString().padStart(11, '0').substr(0, 5);
    var newMessage = document.createElement("div");
    newMessage.className = className;
    newMessage.innerHTML =
        `<strong>${user}</strong>
        <p class="my-0">${message}</p>
        <span>${time}</span>`;
    document.getElementById("scroll").appendChild(newMessage);
    newMessage.scrollIntoView();
}

window.handleChat = function(message, time, id, name) {
    if (id == getUserId()) {
        addChat(message, time);
    }
    else {
        addChat(message, time, false, name);
    }
}