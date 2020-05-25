const CREATE = 'create';
const JOIN = 'join';

const setLoading = function(action, loading) {
    if (action != CREATE && action != JOIN) {
        console.error('invalid action!');
        return;
    }
    let content;
    if (loading) {
        content = `<div class="spinner-border"></div>`
    }
    else {
        let buttonText = `${action[0].toUpperCase()}${action.slice(1)} Couch`;
        content =
            `<div class="input-group-append">
                <button id="${action}RoomButton" class="btn btn-light" onclick="${action}Room()" type="button">${buttonText}</button>
            </div>`
    }
    let buttonHolderElement = document.getElementById(`${action}RoomButtonHolder`);
    buttonHolderElement.innerHTML = content;
}

window.createRoom = function() {
    var username = document.getElementById("username").value.trim();
    if (username != "") {
        setLoading(CREATE, true);
        makePostRequest('/room', {
            "username": username
        }, function(response) {
            window.location = response.responseText;
        }, function(error) {
            setLoading(CREATE, false);
            console.error(error);
        });
        document.getElementById("username").value = "";
    }
}

window.joinRoom = function(){
    var roomId = document.getElementById("roomId").value.trim();
    var user = document.getElementById("user").value.trim();
    if (roomId != "" && user != "") {
        setLoading(JOIN, true);
        makePostRequest('/room/join', {
            "room_name": roomId,
            "username": user
        }, function(response) {
            window.location = response.responseText;
        }, function(error) {
            setLoading(JOIN, false);
            console.error(error);
        });
        document.getElementById("user").value = "";
    }
}

//wait to add the event listeners until the page is loaded
window.onload = function(){
    //if user presses enter act like they clicked the submit button
    document.getElementById("roomId").addEventListener('keyup', function (e) {
        if (e.keyCode == 13) {
            // if the user pushes enter in the textbox join the room
            document.getElementById("joinRoomButton").click();
        }
    });
    //if user presses enter act like they clicked the submit button
    document.getElementById("user").addEventListener('keyup', function (e) {
        if (e.keyCode == 13) {
            // if the user pushes enter in the textbox join the room
            document.getElementById("joinRoomButton").click();
        }
    });
    //if user presses enter act like they clicked the submit button
    document.getElementById("username").addEventListener('keyup', function (e) {
        if (e.keyCode == 13) {
            // if the user pushes enter in the textbox create the room
            document.getElementById("createRoomButton").click();
        }
    });
    // Display action buttons on modals
    setLoading(CREATE, false);
    setLoading(JOIN, false);
}