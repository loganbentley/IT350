/* createuser.js
 * Javascript functions for createuser.html
 */

/* Global Variables */

var createUserURL = "https://taskbee.byu.edu/index.php/signup";

/* TEST VARIABLES */


/* HTML Snippits */



/* Functions */

window.onload = function(){ //Start the accordion functionality
    document.getElementById("create-submit").addEventListener("click", postCreateUser);
}

function postCreateUser(){
    var firstname = document.getElementById("create-firstname").value;
    var lastname = document.getElementById("create-lastname").value;
    var username = document.getElementById("create-username").value;
    var password = document.getElementById("create-password").value;
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            
        }
        else if (xhttp.readyState == 4 && xhttp.status == 403) {
            
        }
    }
    request.open("POST", createUserURL, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("firstName=" + firstname +
        "&lastName=" + lastname +
        "&username=" + username +
        "&password=" + password);
    
    alert("Form Sent.");
}