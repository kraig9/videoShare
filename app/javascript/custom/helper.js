window.getCsrfToken = function() {
	return document.getElementsByName('csrf-token')[0].content
}

window.genericHttpErrorHandler = function(error) {
	console.log(error);
	var status = error.status
	var text = error.text
    alert(`something went wrong:  ${status} : ${text}`);
}

window.sendHttpRequest = function(request, method, url, data, json) {
	request.open(method, url, true);
	request.setRequestHeader("X-CSRF-Token", getCsrfToken());
	if (method == "POST") {
	    if (json) {
	        request.setRequestHeader("Content-Type", "application/json");
	        data = JSON.stringify(data);
	    }
	}
    request.send(data);
}

window.setupHttpHandler = function(request, resolve, reject) {
	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			if (request.status >= 200 && request.status < 300) {
				resolve(request);
			} else {
				reject({
					status: request.status,
					text: request.statusText
				});
			}
		}
	};
}

window.makeRequest = function (method, url, data, successCallback, json, errorCallback) {
	var request = new XMLHttpRequest();
	var promise = new Promise(function (resolve, reject) {
		setupHttpHandler(request, resolve, reject)
		sendHttpRequest(request, method, url, data, json);
	})
    .then(successCallback)
    .catch(errorCallback);
};

window.makePostRequest = function(url, data, successCallback=null, json=true, errorCallback=genericHttpErrorHandler) {
    makeRequest("POST", url, data, successCallback, json, errorCallback);
}

window.makeGetRequest = function(url, successCallback=null, errorCallback=genericHttpErrorHandler) {
    makeRequest("GET", url, null, successCallback, false, errorCallback);
}

// 230.870204 -> 00:03:50
window.secondsToString = function(seconds) {
    var datetime = new Date(seconds * 1000);
	return datetime.toISOString().substr(11, 8);
    // var hours = (datetime.getHours() - 19).toString().padStart(2, '0');
    // var mins = datetime.getMinutes().toString().padStart(2, '0');
    // var secs = datetime.getSeconds().toString().padStart(2, '0');
    // return `${hours}:${mins}:${secs}`
}