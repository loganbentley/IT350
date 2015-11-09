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

    populateEnvironments();
    populateTasks();
    populateTasksCompleted();
    populateTaskGoals();
    populateTimeGoals();

    document.getElementById("save-environment").addEventListener("click", createEnvironment);

}

function populateEnvironments(){
    var url = "https://taskbee.byu.edu/index.php/environment";

    var name = document.getElementById("environment-name").value;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        console.log(request.responseText);
      }
    }
    request.open("GET", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("name=" + name);

    var environments = "";

    for(i = 0; i < array_env.length; i++){
        environments += "<tbody><tr><td>" + array_env[i] + "</td>" +
        "<td>" +
        "<input type='button' class='env-button-start' onclick='' value='Start' />" +
        "<input type='button' class='env-button-stop hidden' onclick='' value='Stop' />" +
        "</td></tr></tbody>";
    }

    document.getElementById("env-table").innerHTML = environments;
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
