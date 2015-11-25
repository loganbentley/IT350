/* main.js
 * Javascript functions for main.html
 */

/* TEST VARIABLES */
var array_env = ["Work", "SchoolMWF", "SchoolTTh", "SocialMediaOnly"];
var array_taskNames = ["Project Name", "Do that one thing", "JUST DO IT!"];
var array_taskDates = ["10/25/2015", "11/1/2015", "10/21/2015"];
var array_tasksCompleted = ["Friends for dinner...", "I'm gonna have", "friends for dinner"];

/* HTML Snippits */

var tasksTableHeader = "<thead><tr><th>&nbsp;</th><th>Task</th><th>Due</th></tr></thead>";

/* Functions */

window.onload = function(){

    populateDashboard();
    populateEnvironments();
    populateTasks();
    populateTasksCompleted();
    populateTaskGoals();
    populateTimeGoals();

    document.getElementById("save-environment").addEventListener("click", createEnvironment);

}

function populateDashboard(){
    var dashURL = "https://taskbee.byu.edu/index.php/dashboard";
    var response;
        var username;
        var firstName;
        var lastName;
        var currentPercent;

    $.get( dashURL, function( data ) {
        response = JSON.parse(data);
        console.log(response);

        if(response.success != 1){
            window.location = "signin.html";
        }

        username = response.user[0].username;
            console.log("Signed-in as " + response.user[0].username);

        firstName = response.user[0].firstName;
        lastName = response.user[0].lastName;
        currentPercent = response.user[0].currentPercent;

        document.getElementById("username").innerHTML = firstName + " " + lastName;
        document.getElementById("dash-on-task").innerHTML = currentPercent + "%";
        $('#dash-usersignin-username').removeClass('hidden');
        $('#dash-usersignin-signin').addClass('hidden');
    });
}

function populateEnvironments() {
  var url = "https://taskbee.byu.edu/index.php/environment";

  $.get( url, function( data ) {
    var data = JSON.parse(data);
    var environments = data.environments;
    var html = "";
    console.log(environments);
    for(i = 0; i < environments.length; i++){
        html = "<tbody><tr><td><a id='environment-" + i + "' href='#' type='button' value='" + environments[i].name + "'>Edit Allowed Websites</a></td>" +
        "<td><strong>" + environments[i].name + "</strong></td>" +
        "<td>" +
        "<input type='button' class='env-button-start btn btn-success' onclick='' value='Start' />" +
        "<input type='button' class='env-button-stop hidden btn btn-fail' onclick='' value='Stop' />" +
        "</td></tr></tbody>";

        document.getElementById("env-table").innerHTML += html;
        $('#environment-' + i).click( showEnvironmentSummary( i ) );
    }

  });
}

function populateTasks() {
    var tasks = tasksTableHeader;

    for(i = 0; i < array_taskNames.length; i++){
        tasks += "<tbody><tr><td><input type='checkbox' /></td>" +
        "<td>" + array_taskNames[i] + "</td>" +
        "<td>" + array_taskDates[i] + "</td></tr></tbody>";
    }

    document.getElementById("tasks-table").innerHTML = tasks;
}

function populateTasksCompleted(){
    var completed = "";

    for(i = 0; i < array_tasksCompleted.length; i++){
        completed += "<tbody><tr><td>" + array_tasksCompleted[i] + "</td>" +
        "<td>" +
        "<input type='button' class='tasks-completed-reopen' onclick='' value='Reopen' />" +
        "</td></tr></tbody>";
    }

    document.getElementById("tasks-table-completed").innerHTML = completed;
}

function populateTaskGoals() {

}

function populateTimeGoals() {

}

function createEnvironment() {
    var url = "https://taskbee.byu.edu/index.php/environment";

    var name = document.getElementById("environment-name").value;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      console.log(request.resultText);
    }
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("name=" + name);
}

function showEnvironmentSummary(id) {
  return function() {
    alert(id)
  }
}
