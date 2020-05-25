// 230.870204 -> 00:03:50
export const secondsToString = function(seconds) {
    var datetime = new Date(seconds * 1000);
	return datetime.toISOString().substr(11, 8);
}