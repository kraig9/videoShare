window.createRoom = function(){
    var username = document.getElementById("username").value.trim();
    if (username != "") {
        makePostRequest('/room', {
            "username": username
        }, function(request) {
            window.location = request.responseText;
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
        }, function(request) {
            window.location = request.responseText;
        });
        document.getElementById("user").value = "";
    }
}