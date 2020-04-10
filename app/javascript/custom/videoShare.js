window.initializeVideo = function () {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    window.onYouTubeIframeAPIReady = function() {
        new YT.Player('player', {
            height: '1080',
            width: '1920',
            playerVars: {
                // controls: 0,
            },
            videoId: 'tgbNymZ7vqY',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
    
    // 4. The API will call this function when the video player is ready.
    window.onPlayerReady = function (event) {
        document.getElementById("player")
        var videoPlayer = YT.get('player');
        if (videoPlayer.getPlayerState() == YT.PlayerState.PLAYING) {
            makePostRequest('/user/timestamp', {
                "id": getUserId(),
                "room_id": getRoomId(),
                "timestamp": videoPlayer.getCurrentTime(),
                "user_action": "pause"
            }, function(request) {
                window.request = request
            });
            // console.log(videoPlayer.getCurrentTime());
        }
        else if (videoPlayer.getPlayerState() == YT.PlayerState.PAUSED || videoPlayer.getPlayerState() == YT.PlayerState.CUED) {
            // videoPlayer.playVideo();
            makePostRequest('/user/timestamp', {
                "id": getUserId(),
                "room_id": getRoomId(),
                "timestamp": videoPlayer.getCurrentTime(),
                "user_action": "play"
            }, function(request) {
                window.request = request
            });
            // console.log(videoPlayer.getCurrentTime());
        }
    }
      
    
    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    window.onPlayerStateChange = function(event) {
        
    }
}

window.getRoomId = function() {
    return document.getElementById('room_messages').getAttribute('data-room-id');
}

window.getUserId = function() {
    return document.getElementById('user_id').title;
}}