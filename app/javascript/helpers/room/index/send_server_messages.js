import {
    makePostRequest,
} from '../../send_request.js';

export const sendVideoMessage = function(player, action, time=-1) {
    if (time == -1) {
        time = player.getCurrentTime();
    }
    let requestData = {
        "user_action": action,
        "timestamp": time,
    }
    makePostRequestAndErrorHandle('/user/timestamp', requestData);
}

export const sendChangeVideo = function(videoId) {
    let requestData = {
        "user_action": "videoChange",
        "video_id": videoId,
    }
    makePostRequestAndErrorHandle('/user/videochange', requestData);
}

export const sendChatMessage = function(message) {
    let requestData = {
        "user_action": "chat",
        "chat": message,
    }
    makePostRequestAndErrorHandle('/user/chatpost', requestData);
}

export const sendUserLeaving = async function(e) {
    try {
        let newLocation = await makePostRequest('/user/leaveroom');
        window.location = newLocation;
    }
    catch (error) {
        console.error(error);
    }
}

const makePostRequestAndErrorHandle = async function(url, requestData) {
    try {
        await makePostRequest(url, requestData);
    }
    catch (error) {
        console.error(error);
    }
}