export const onEnterDoButtonClick = function(buttonElementId) {
    //If user presses enter, run click handler of specified button
    return function(e) {
        if (e.keyCode == 13) {
            document.getElementById(buttonElementId).click();
        }
    }
}
