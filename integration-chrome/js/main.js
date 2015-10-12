/* main.js
 * Javascript functions for main.html
 */

window.onload = function(){
    document.getElementById("commentSubmitButton").addEventListener("click", postComment);
}

function postComment(){
    var postURL = "https://taskbee.byu.edu/index.php/foo";
    var comment = document.getElementById('commentInput').value;

    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("demo").innerHTML = xhttp.responseText;
        }
    }
    xhttp.open("POST", postURL, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("comment=" + comment);
    
    alert("Comment Posted");

}