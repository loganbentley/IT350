/* signin.js
 * Javascript functions for signin.html
 */

/* Global Variables */

var signinURL = "https://taskbee.byu.edu/index.php/login";
var submitButton; //Can't assign value here, page has to load first
var userField;
var passField;

/* TEST VARIABLES */


/* HTML Snippits */



/* Functions */

window.onload = function(){
    submitButton = document.getElementById("signin-submit");
    userField = document.getElementById("signin-user");
    passField = document.getElementById("signin-pass");
    
    submitButton.addEventListener("click", postSignin);
}

function postSignin(){
    var username = userField.value;
    var password = passField.value;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            postSuccess();
        }
        else if (request.readyState == 4 && request.status >= 400) {
            alert("Request failed.  Status: " + request.status);
        }
        else{
            //alert("Status: " + request.status);
        }
    }
    request.open("POST", signinURL, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("&username=" + username + "&password=" + password);
    
} 

function postSuccess(){
    userField.value = "";
    passField.value = "";
    window.location = "main.html";
}
