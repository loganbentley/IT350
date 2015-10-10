/* main.js
 * Javascript functions for main.html
 */

window.onload = function(){
    document.getElementById("commentSubmitButton").addEventListener("click", postComment);
}

function postComment(){
    window.alert("Called postComment")
}