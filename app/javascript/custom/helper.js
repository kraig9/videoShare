window.sendPostRequest = function(url, data, callback, json=true) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    if (json) {
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send(data);
    }
}