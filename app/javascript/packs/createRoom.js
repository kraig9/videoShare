window.createRoom = function(){
    var username = document.getElementById("username").value.trim();
    if (username != "") {
        makePostRequest('/room', {
            "username": username
        }, function(response) {
            window.location = response.responseText;
        });
        document.getElementById("username").value = "";
    }
}

window.joinRoom = function(){
    var roomId = document.getElementById("roomId").value.trim();
    var user = document.getElementById("user").value.trim();
    if (roomId != "" && user != "") {
        makePostRequest('/room/join', {
            "room_name": roomId,
            "username": user
        }, function(response) {
            window.location = response.responseText;
        }, function(error) {
            console.log(error);
            alert(error);
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
}