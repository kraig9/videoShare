import {
    Actions,
    setLoading,
} from '../../helpers/welcome/home/couch_button_handlers.js';

import {
    onEnterDoButtonClick,
} from '../../helpers/general.js';

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
