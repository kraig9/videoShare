import {
    Actions,
    setLoading,
} from '../../helpers/welcome/scene1/buttonHandlers.js';

window.onload = function() {
    // Display action buttons on modals
    setLoading(Actions.create, false);
    setLoading(Actions.join, false);
    // Add enter button handlers to textboxes
    document.getElementById('joinRoomId')
            .addEventListener('keyup', onEnterDoButtonClick('joinRoomButton'));

    document.getElementById("joinRoomUser")
            .addEventListener('keyup', onEnterDoButtonClick('joinRoomButton'));

    document.getElementById("createRoomUser")
            .addEventListener('keyup', onEnterDoButtonClick('createRoomButton'));
}

const onEnterDoButtonClick = function(buttonElementId) {
    //If user presses enter, run click handler of specified button
    return function(e) {
        if (e.keyCode == 13) {
            document.getElementById(buttonElementId).click();
        }
    }
}