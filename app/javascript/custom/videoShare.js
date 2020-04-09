window.initializeVideo = function () {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    
    // 4. The API will call this function when the video player is ready.
    window.onPlayerReady = function (event) {
        var videoPlayer = YT.get('player');
        console.log(videoPlayer.getCurrentTime())
        document.getElementById('clickme').addEventListener('click', function() {
            if (player.getPlayerState() == YT.PlayerState.PLAYING) {
                // videoPlayer.pauseVideo();
                window.makePostRequest('/user/timestamp', {
                    "id": 1,
                    "room_id": 2,
                    "timestamp": videoPlayer.getCurrentTime(),
                    "user_action": "pause"
                }, function(request) {
                    window.request = request
                });
                // console.log(videoPlayer.getCurrentTime());
            }
            else if (player.getPlayerState() == YT.PlayerState.PAUSED || player.getPlayerState() == YT.PlayerState.CUED) {
                // videoPlayer.playVideo();
                window.makePostRequest('/user/timestamp', {
                    "id": 1,
                    "room_id": 2,
                    "timestamp": videoPlayer.getCurrentTime(),
                    "user_action": "play"
                }, function(request) {
                    window.request = request
                });
                // console.log(videoPlayer.getCurrentTime());
            }
        });
    }
      
    
    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    window.onPlayerStateChange = function(event) {
        // var videoPlayer = YT.get('player');
        // console.log(event.data);
    }
    
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('player', {
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
}