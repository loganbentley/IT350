/* signin.js
 * Javascript functions for signin.html
 */

/* Global Variables */

var signinURL = "https://taskbee.byu.edu/index.php/login";

/* TEST VARIABLES */


/* HTML Snippits */



/* Functions */

window.onload = function(){ //Start the accordion functionality
    document.getElementById("signin-submit").addEventListener("click", postSignin);
}

function postSignin(){
    alert("About to POST to " + signinURL);
    
    var username = document.getElementById("signin-user").value;
    var password = document.getElementById("signin-pass").value;


    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            alert("Success.");
        }
        else if (request.readyState == 4 && request.status >= 400) {
            alert("Request failed.  Status: " + request.status);
        }
        else{
            alert("Status: " + request.status);
        }
    }
    request.open("POST", signinURL, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("&username=" + username + "&password=" + password);
    

    
   /* var postData = "&username=" + username + "&password=" + password;
    $.post(signinURL, postData, postSuccess);
    */
} 

function postSuccess(){
    alert('Success');
}
