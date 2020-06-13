import {
    updateCurrentSongTime,
} from './overlay.js';

import {
    sendChangeVideo,
    sendUserLeaving,
} from './send_server_messages.js';

import {
    onEnterDoButtonClick
} from '../../general.js';

export const initializeVideoForm = function() {
    // initialize tooltips
    $(function () {
        $('#videoLink').tooltip()
    });
    document.getElementById('changeVideo')
            .addEventListener('click', changeVideo);

    document.getElementById('videoLink')
            .addEventListener('keyup', onEnterDoButtonClick('changeVideo'));

    document.getElementById('confrimLeaveYes')
            .addEventListener('click', sendUserLeaving);
}

export const initializeTime = function(event) {
    let state = YT.get('player').getPlayerState();
    if (state == YT.PlayerState.CUED) {
        updateCurrentSongTime(0);
    }
}

export const isVideoLoaded = function() {
    return YT.get('player').getVideoUrl() != 'https://www.youtube.com/watch';
}

export const displayError = function (message) {
    $('#videoLink')
        .attr('data-original-title', message)
        .tooltip('show');
}

export const hideError = function() {
    $('#videoLink')
        .attr('data-original-title', '')
        .tooltip('hide');
}

const changeVideo = function(event) {
    const player = YT.get('player');
    let videoUrl = document.getElementById('videoLink').value;
    let splitUrl = videoUrl.split('=');
    // JavaScript has short-circuit evaluation so
    // it will not evalutate the second part of
    // the expression if the first is false
    if (splitUrl.length > 1 && splitUrl[1].length >= 11) {
        let videoId = splitUrl[1].substr(0, 11);
        sendChangeVideo(player, videoId);
        document.getElementById('videoLink').value = '';
        return;
    }
    displayError('Invalid Youtube URL!')
}
