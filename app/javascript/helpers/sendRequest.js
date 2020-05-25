const getCsrfToken = function() {
	return document.getElementsByName('csrf-token')[0].content
}

const makeRequest = function (method, url, requestData) {
	let httpRequest = {
		method: method,
        headers: {
			"X-CSRF-Token": getCsrfToken(),
		},
	}
	if (method != 'GET') {
        httpRequest.body = JSON.stringify(requestData);
        httpRequest.headers['Content-Type'] = 'application/json';
	}
    try {
        let response = await fetch(url, httpRequest);
        if (response.ok) {
            responseData = await response.json();
			return Promise.resolve(responseData);
		}
        return Promise.reject(response);
	}
	catch (error) {
		return Promise.reject(error);
	}
};

export const makePutRequest = function(url, requestData) {
    return makeRequest("PUT", url, requestData);
}

export const makePostRequest = function(url, requestData) {
    return makeRequest("POST", url, requestData);
}

export const makeGetRequest = function(url) {
    return makeRequest("GET", url);
}

export const makeDeleteRequest = function(url) {
	return makeRequest("DELETE", url);
}

