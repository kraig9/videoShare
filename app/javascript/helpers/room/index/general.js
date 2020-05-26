export const displayError = function (message) {
    document.getElementById("error").innerHTML =
        `<div class="alert alert-danger alert-dismissable m0 fade show" role="alert">`
            + message +
            `<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
}

export const getRoomId = function() {
    return document.getElementById('room_id').getAttribute('data-room-id');
}

export const getUserId = function() {
    return document.getElementById('user_id').title;
}

export const secondsToString = function(seconds) {
    var datetime = new Date(seconds * 1000);
    // example input -> output (230.870204 -> 00:03:50)
    return datetime.toISOString().substr(11, 8);
}
