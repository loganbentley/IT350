/* main.js
 * Javascript functions for main.html
 */

/* TEST VARIABLES */
var array_env = ["Work", "SchoolMWF", "SchoolTTh", "SocialMediaOnly"];
var array_taskNames = ["Project Name", "Do that one thing", "JUST DO IT!"];
var array_taskDates = ["10/25/2015", "11/1/2015", "10/21/2015"];
var array_tasksCompleted = ["Friends for dinner...", "I'm gonna have", "friends for dinner"];

var array_taskGoalsActive = ["Complete 10 tasks", "Score > 90% by Monday"];
var array_taskGoalsDates = ["12 DEC 2015", "21 DEC 2015"];

/* GET URLs */
var dashURL = "https://taskbee.byu.edu/index.php/dashboard";
var getTasksURL = "https://taskbee.byu.edu/index.php/task";

/* POST URLS */
var signOutURL = "https://taskbee.byu.edu/index.php/logout";
var createTaskURL = "https://taskbee.byu.edu/index.php/task";

/* HTML Snippits */

var tasksTableHeader =
    "<thead><tr><th>&nbsp;</th><th>Task</th><th>Description</th><th>Due</th></tr></thead>";

/* Functions */

window.onload = function(){

    populateDashboard();
    populateEnvironments();
    populateTasks();
    populateTasksCompleted();
    populateGoals();

    document.getElementById("save-environment").addEventListener("click", createEnvironment);
    document.getElementById("save-task").addEventListener("click", createTask);
    document.getElementById("dash-usersignin-signout").addEventListener("click", signOut);

}

/******************************************************************************
 * Setup
 *****************************************************************************/

function populateDashboard(){

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
    var taskTableContents = tasksTableHeader;


    var checkbox = "<input type='checkbox' />"

    $.get( getTasksURL, function( data ) {
        var data = JSON.parse(data);
        var tasks = data.tasks;
        console.log(tasks);

        taskTableContents += "<tbody>";
        for(i = 0; i < tasks.length; i++){
            taskTableContents += "<tr>" +
                "<td>" + checkbox + "</td>" +
                "<td><strong>" + tasks[i].name + "</strong></td>" +
                "<td>" + tasks[i].description + "</td>" +
                "<td>" + tasks[i].dueDate + "</td>" +
                "</tr>";
        }
        /* can change above code to disassemble parts of the date and display
         *  only the date parts (without the timestamp), but we can do that later
         */
        taskTableContents += "</tbody>";

    /*
    for(i = 0; i < array_taskNames.length; i++){
        tasks += "<tbody><tr><td><input type='checkbox' /></td>" +
        "<td>" + array_taskNames[i] + "</td>" +
        "<td>" + array_taskDates[i] + "</td></tr></tbody>";
    */

        document.getElementById("tasks-table").innerHTML = taskTableContents;
    });
}

function populateTasksCompleted(){
/*    var completed = "";

    for(i = 0; i < array_tasksCompleted.length; i++){
        completed += "<tbody><tr><td>" + array_tasksCompleted[i] + "</td>" +
        "<td>" +
        "<input type='button' class='tasks-completed-reopen' onclick='' value='Reopen' />" +
        "</td></tr></tbody>";
    }

    document.getElementById("tasks-table-completed").innerHTML = completed;
*/
}

function populateGoals() {

}

/******************************************************************************
 * App Functions
 *****************************************************************************/

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

function createTask() {
    var title = document.getElementById("task-name").value;
    var description = document.getElementById("task-desc").value;
    var dateIn = document.getElementById("task-due").value;
    var dueDate = new Date(dateIn);//Implicitly calls .parse(dateIn)

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        console.log(request.resultText);
    }

    if(title && dateIn && (dueDate != NaN)){
        var dateString = dueDate.toISOString();
        request.open("POST", createTaskURL, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("name=" + title + "&description=" + description + "&dueDate=" + dateString);

        //Reload the tasks list
        populateTasks();
    }
}

function signOut() {
    var request = new XMLHttpRequest();
    request.open("GET", signOutURL, true);
    request.send();

    /*
    username = "";
    firstName = "";
    lastName = "";
    currentPercent = "";
    */

    window.location.reload(true);
    //window.close();
}
