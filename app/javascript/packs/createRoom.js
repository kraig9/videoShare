window.createRoom = function(){
    var username = document.getElementById("username").value.trim();
    if (username != "") {
        makePostRequest('/room/new', {
            "username": username
        });
        document.getElementById("joinRoomText").value = "";
    }
}

window.joinRoom = function(){
    var roomId = document.getElementById("joinRoomText").value.trim();
    if (roomId != "") {
        makePostRequest('/room/join', {
            "room_id": roomId
        });
        document.getElementById("joinRoomText").value = "";
    }
}