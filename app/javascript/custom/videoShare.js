window.initializeVideo = function () {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.receivedPost = false;
    
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('player', {
            height: '1080',
            width: '1920',
            playerVars: {
                // controls: 0,
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
    
    // 4. The API will call this function when the video player is ready.
    window.onPlayerReady = function (event) {
        console.log('dfssa');
    }
      
    
    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    window.onPlayerStateChange = function(event) {
        if (window.receivedPost == 0) {
            player = YT.get('player');
            if (player.getPlayerState() == YT.PlayerState.PLAYING) {
                console.log("play")
                makePostRequest('/user/timestamp', {
                    "id": getUserId(),
                    "room_id": getRoomId(),
                    "timestamp": player.getCurrentTime(),
                    "user_action": "play"
                }, function(request) {
                    window.request = request
                });
            }
            else if (player.getPlayerState() == YT.PlayerState.PAUSED) {
                console.log("pause")
                makePostRequest('/user/timestamp', {
                    "id": getUserId(),
                    "room_id": getRoomId(),
                    "timestamp": player.getCurrentTime(),
                    "user_action": "pause"
                }, function(request) {
                    window.request = request
                });
            }
        }
        if(window.receivedPost > 0){
            window.receivedPost--;
        }
    }
}

window.getRoomId = function() {
    return document.getElementById('room_messages').getAttribute('data-room-id');
}

window.getUserId = function() {
    return document.getElementById('user_id').title;
}
window.changeVideo = function() {
    player = YT.get('player');
    videoUrl = document.getElementById('fname').value;
    console.log(videoUrl);
    //player.loadVideoByUrl(videoUrl);
    videoUrlParsed = videoUrl.split("=")[1];
    player.cueVideoById(videoUrlParsed);

    makePostRequest('/user/videochange', {
        "id": getUserId(),
        "room_id": getRoomId(),
        "user_action": "videoChange",
        "video_id": videoUrlParsed
    }, function(request) {
        window.request = request
    });
 }