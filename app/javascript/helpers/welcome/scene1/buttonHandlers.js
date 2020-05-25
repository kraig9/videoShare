import {
    makePostRequest
} from '../../sendRequest.js';

export const Actions = {
    join: 'join',
    create: 'create',
}

export const setLoading = function(action, loading) {
    let content = getButtonHolderContent(action, loading);
    document.getElementById(`${action}RoomButtonHolder`).innerHTML = content;
    document.getElementById(`${action}RoomClose`).disabled = loading;
    if (!loading) {
        let actionButton = document.getElementById(`${action}RoomButton`)
        let buttonCallback = function() {
            handleButtonClick(action);
        }
        actionButton.addEventListener('click', buttonCallback);
    }
}

const getButtonHolderContent = function(action, loading) {
    if (loading) {
        return `<div class="spinner-border"></div>`;
    }
    let buttonText = `${action[0].toUpperCase()}${action.slice(1)} Couch`;
    return `<div class="input-group-append">
                <button id="${action}RoomButton" class="btn btn-light" type="button">${buttonText}</button>
            </div>`;
}

const parseUserInput = function(action, usernameElement) {
    let username = usernameElement.value.trim();
    let requestData = null;
    if (username != '') {
        requestData = {username: username};
        if (action == Actions.join) {
            var roomId = document.getElementById(`${action}RoomId`).value.trim();
            // add roomId to request data if input is valid
            requestData = (roomId != '') ? {...requestData, roomId: roomId} : null
        }
    }
    return requestData;
}

const handleButtonClick = async function(action) {
    let usernameElement = document.getElementById(`${action}RoomUser`);
    let requestData = parseUserInput(action, usernameElement);
    if (requestData != null) {
        setLoading(action, true);
        usernameElement.value = '';
        let requestUrl = (action == Actions.join) ? '/room/join' : '/room';
        try {
            let newLocation = await makePostRequest(requestUrl, requestData);
            // redirect to next page
            window.location = newLocation;
        }
        catch (error) {
            console.error(error);
            setLoading(action, false);
        }
    }
}