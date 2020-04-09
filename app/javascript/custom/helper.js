window.getCsrfToken = function() {
	return document.getElementsByName('csrf-token')[0].content
}

window.genericHttpErrorHandler = function(error) {
    alert(`something went wrong:  ${error}`);
}

window.makeRequest = function (url, method, data, successCallback, json=true, errorCallback=genericHttpErrorHandler) {
	// Create the XHR request
	var request = new XMLHttpRequest();
	// Return it as a Promise
	var promise = new Promise(function (resolve, reject) {
		// Setup our listener to process compeleted requests
		request.onreadystatechange = function () {
			// Only run if the request is complete
			if (request.readyState !== 4) return;
			// Process the response
			if (request.status >= 200 && request.status < 300) {
				// If successful
				resolve(request);
			} else {
				// If failed
				reject({
					status: request.status,
					statusText: request.statusText
				});
			}

		};
		// Setup our HTTP request
		request.open(method, url, true);
		request.setRequestHeader("X-CSRF-Token", getCsrfToken());
		// Send the request
		if (method == "POST") {
		    if (json) {
		        request.setRequestHeader("Content-Type", "application/json");
		        data = JSON.stringify(data);
		    }
	        request.send(data);
		}
	})
    .then(successCallback)
    .catch(errorCallback);
};

window.makePostRequest = function(url, data, successCallback, json=true, errorCallback=genericHttpErrorHandler) {
    makeRequest(url, "POST", data, successCallback, json, errorCallback);
}

window.makeGetRequest = function(url, successCallback, errorCallback=genericHttpErrorHandler) {
    makeRequest(url, "GET", null, successCallback, false, errorCallback);
}