/* main.js
 * Javascript functions for main.html
 */

/* TEST VARIABLES */
/*
var array_env = ["Work", "SchoolMWF", "SchoolTTh", "SocialMediaOnly"];
var array_taskNames = ["Project Name", "Do that one thing", "JUST DO IT!"];
var array_taskDates = ["10/25/2015", "11/1/2015", "10/21/2015"];
var array_tasksCompleted = ["Friends for dinner...", "I'm gonna have", "friends for dinner"];

var array_taskGoalsActive = ["Complete 10 tasks", "Score > 90% by Monday"];
var array_taskGoalsDates = ["12 DEC 2015", "21 DEC 2015"];
*/

/* GET URLs */
var dashURL = "https://taskbee.byu.edu/index.php/dashboard";
var getTasksURL = "https://taskbee.byu.edu/index.php/task";
var getWebsitesURL = "https://taskbee.byu.edu/index.php/website";
var toggleEnvironmentURL = "https://taskbee.byu.edu/index.php/toggleEnvironment";
var getTaskGoalsURL = "https://taskbee.byu.edu/index.php/task-goal";
var getTimeGoalsURL = "https://taskbee.byu.edu/index.php/time-goal";

/* POST URLS */
var signOutURL = "https://taskbee.byu.edu/index.php/logout";
var createTaskURL = "https://taskbee.byu.edu/index.php/task";
var createTaskGoalURL = "https://taskbee.byu.edu/index.php/task-goal";
var createTimeGoalURL = "https://taskbee.byu.edu/index.php/time-goal";
var sessionDataURL = "https://taskbee.byu.edu/index.php/session-data";

/* PUT URLS */
var completeTaskURLBase = "https://taskbee.byu.edu/index.php/task";

/* HTML Snippits */

var tasksTableHeader = "<thead><tr><th>&nbsp;</th><th>Task</th><th>Details</th><th>Due</th></tr></thead>";
var taskGoalTableHeader = "<thead><tr><th>Name</th><th>Tasks to Complete</th><th>By Date</th></tr></thead>";
var timeGoalTableHeader = "<thead><tr><th>Min. Percent</th><th>On Date</th></tr></thead>";

var activeEnvironment = "";
var NO_ACTIVE_ENV = "None";

/* Functions */

window.onload = function() {

    populateDashboard();
    populateEnvironments();
    populateTasks();
    populateTasksCompleted();
    populateGoals();

    document.getElementById("save-environment").addEventListener("click", createEnvironment);
    document.getElementById("save-task").addEventListener("click", createTask);
    document.getElementById("save-task-goal").addEventListener("click", createTaskGoal);
    document.getElementById("save-time-goal").addEventListener("click", createTimeGoal);
    document.getElementById("dash-usersignin-signout").addEventListener("click", signOut);

};

/******************************************************************************
 * Setup
 *****************************************************************************/

function populateDashboard(){

    var response;
    var username;
    var firstName;
    var lastName;

	populatePercentages();

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

        document.getElementById("username").innerHTML = firstName + " " + lastName;
        $('#dash-usersignin-username').removeClass('hidden');
        $('#dash-usersignin-signin').addClass('hidden');
    });
}

function populatePercentages() {
	$.get( sessionDataURL, function( data ) {
		data = JSON.parse(data);
		if (data.success) {
			var session = data.session;
			$('#dash-session-percent').text(session.currentPercentage);
			$('#dash-on-task').text(session.allTimePercentage);
		}
	});
}

function populateEnvironments() {
  var url = "https://taskbee.byu.edu/index.php/environment";

  $.get( url, function( data ) {
    var envdata = JSON.parse(data);
    var environments = envdata.environments;
    var html = "";

    for (i = 0; i < environments.length; i++) {
        var activeButton = "";
        console.log(environments[i].active);
        if (environments[i].active == 1) {
          activeButton = "<input id='environment-stop-"+i+"' type='button' class='env-button-stop btn btn-danger' value='Stop' /><input id='environment-start-"+i+"' type='button' class='env-button-start btn btn-success' value='Start' style='display:none;'/>";
          $('#dash-environment').text(environments[i].name);
        }
        else {
          activeButton = "<input id='environment-stop-"+i+"' type='button' class='env-button-stop btn btn-danger' value='Stop' style='display:none;'/><input id='environment-start-"+i+"' type='button' class='env-button-start btn btn-success' value='Start' />";
        }
        html += "<tbody><tr><td><a id='environment-" + i + "' href='#' type='button' value='" + environments[i].name + "' >Edit Sites</a></td>" +
        "<td><strong>" + environments[i].name + "</strong></td>" +
        "<td>" +
        activeButton +
        "</td></tr></tbody>";

    }

    document.getElementById("env-table").innerHTML += html;

    for (var j = 0; j < environments.length; j++) {
      $('#environment-' + j).click( showEnvironmentSummary(environments[j].name, environments[j].environmentId) );
      $('#environment-start-' + j).click( startEnviroment(environments[j].name, environments[j].environmentId, j) );
      $('#environment-stop-' + j).click( stopEnvironment(environments[j].name, environments[j].environmentId, j) );
    }

  });
}

function showEnvironmentSummary(name, id) {
  return function() {

    $.get( getWebsitesURL + "?environmentId=" + id , function( data ) {
        var envdata = JSON.parse(data);
        var websites = envdata.websites;

        var websiteHTML = "";
        for (var i = 0; i < websites.length; i++) {
          websiteHTML += '<p>'+websites[i].domainName+'</p>';
        }

        var html = '<div id="environment-details-modal-'+id+'" class="modal fade" role="dialog">' +
                    '<div class="modal-dialog">' +
                      '<div class="modal-content">' +
                        '<div class="modal-header">' +
                          '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                          '<h2 class="modal-title">'+name+'</h2>' +
                        '</div>' +
                          '<div class="modal-body">' +
                            '<h4>Blacklisted Sites</h4>' +
                            '<div id="blacklisted-sites-'+id+'">' +
                            websiteHTML +
                            '</div>' +
                            '<label class="form-label">URL:</label>' +
                            '<input id="environment-name-'+id+'" type="text" class="form-control">' +
                            '<br/>' +
                            '<input id="new-website-'+id+'" type="button" class="btn btn-primary" value="Add Website">' +
                          '</div>' +
                          '<div class="modal-footer">' +
                            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                            '<button id="save-environment" type="submit" class="btn btn-success" data-dismiss="modal">Save</button>' +
                          '</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>';

        document.getElementById("modals").innerHTML = html;
        $('#environment-details-modal-'+id).modal('show');
        $('#new-website-' + id).click( function() {
          var url = $('#environment-name-'+id).val();
          var request = new XMLHttpRequest();
          request.onreadystatechange = function() {
            if (request.readyState === 4) {
              $('#blacklisted-sites-'+id).append('<p>'+url+'</p>');
              $('#environment-name-'+id).val('');
            }
          };
          request.open("POST", getWebsitesURL, true);
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          request.send("environmentId=" + id + "&url=" + url);
        });

      });
  };
}

function startEnviroment(name, id, elementId) {
  return function() {
    if (activeEnvironment !== "") {
      alert('You cannot start more than one environment at a time!');
    }
    else {
      $('#environment-start-'+elementId).hide();
      $('#environment-stop-'+elementId).show();
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState === 4) {
            activeEnvironment = name;
            $('#dash-environment').text(activeEnvironment);
			populatePercentages();
        }
      };
      request.open("POST", toggleEnvironmentURL, true);
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      request.send("active=" + 1 + "&environmentId=" + id);
    }
  };
}

function stopEnvironment(name, id, elementId) {
  return function() {
    $('#environment-start-'+elementId).show();
    $('#environment-stop-'+elementId).hide();
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        activeEnvironment = "";
        $('#dash-environment').text(NO_ACTIVE_ENV);
		populatePercentages();
      }
    };
    request.open("POST", toggleEnvironmentURL, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("active=" + 0 + "&environmentId=" + id);
  };
}

function populateTasks() {
    var taskTableContents = tasksTableHeader;

    $.get( getTasksURL, function( data ) {
        var taskdata = JSON.parse(data);
        var tasks = taskdata.tasks;
        console.log(tasks);

        taskTableContents += "<tbody>";
        for(var i = 0; i < tasks.length; i++){
            //Only display open tasks (for now)
            if(tasks[i].completed == "0"){//web app returns completed as a string
                taskTableContents += "<tr>" +
                    "<td>" + "<input type='checkbox' id='task-box-" + tasks[i].taskId + "' " +
                       "value='" + tasks[i].taskId + "' />" + "</td>" +
                    "<td><strong>" + tasks[i].name + "</strong></td>" +
                    "<td>" + tasks[i].description + "</td>" +
                    "<td>" + tasks[i].dueDate + "</td>" +
                    "</tr>";

            }
        }
        /* can change above code to disassemble parts of the date and display
         *  only the date parts (without the timestamp), but we can do that later
         */
        taskTableContents += "</tbody>";

        // Write tasks table to html page
        document.getElementById("tasks-table").innerHTML = taskTableContents;

        // Add listeners to completion checkboxes
        for(i = 0; i < tasks.length; i++){
            if(tasks[i].completed == "0"){
                taskIdNum = tasks[i].taskId;
                $('#task-box-' + tasks[i].taskId).change(
                    function () { completeTask(this); }
                );
                //document.getElementById("task-box-" + tasks[i].taskId).addEventListener("change",
                //    function () { completeTask(taskIdNum); }
                //);
            }
        }
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
    var taskGoalContents = taskGoalTableHeader;
    var timeGoalContents = timeGoalTableHeader;

    //Load the task Goals
    $.get( getTaskGoalsURL, function( data ) {
        var data = JSON.parse(data);
        var taskGoals = data.taskGoal;//taskGoal, not taskGoals
		console.log(data);
        /*
        taskGoalContents += "<tbody>";
        for(i = 0; i < taskGoals.length; i++){
            taskGoalContents += "<tr>" +
                "<td>" + "<span class='taskGoalName'>" + taskGoals[i].name + "</span></td>" +
                "<td>" + "<span class='taskGoalNumTasks'>" + taskGoals[i].number + "</span></td>" +
                "<td>" + "<spand class='taskGoalDate'>" + taskGoals[i].date + "</span></td>" +
                "</tr>";
        }
        taskGoalContents += "</tbody>";

        document.getElementById("task-goals-table").innerHTML = taskGoalContents;
        */
    });
    /*
    //Load the time Goals
    $.get( getTaskGoalsURL, function( data ) {
        var data = JSON.parse(data);
        var timeGoals = data.timeGoals;
        console.log(timeGoals);

        timeGoalContents += "<tbody>";
        for(i = 0; i < timeGoals.length; i++){
            timeGoalContents += "<tr>" +
                "<td>" + "<span class='timeGoalName'>" + timeGoals[i].name + "</span></td>" +
                "<td>" + "<span class='timeGoalPercent'>" + timeGoals[i].percent + "</span></td>" +
                "<td>" + "<spand class='timeGoalDate'>" + timeGoals[i].date + "</span></td>" +
                "</tr>";
        }
        timeGoalContents += "</tbody>";

        document.getElementById("time-goals-table").innerHTML = timeGoalContents;
    });
    */
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


function createTask() {
    var title = document.getElementById("task-name").value;
    var description = document.getElementById("task-desc").value;
    var dateIn = document.getElementById("task-due").value;
    var dueDate = new Date(dateIn);//Implicitly calls .parse(dateIn)

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        console.log(request.resultText);
    }

    if(title != "" && description != "" && dateIn != "" && dueDate != ""){
        var dateString = dueDate.toISOString();
        request.open("POST", createTaskURL, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("name=" + title + "&description=" + description + "&dueDate=" + dateString);

        //Reload the tasks list
        populateTasks();
    }
}

function createTaskGoal() {
    var title = document.getElementById("task-goal-name").value;
    var numTasks = document.getElementById("task-goal-num").value;
    var date = document.getElementById("task-goal-date").value;

    var dueDate = new Date(date);
    var today = new Date(Date.now()).toISOString();

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        console.log(request.resultText);
    }

    if(title != "" && numTasks != "" && date != ""){
        var dateString = dueDate.toISOString();
        request.open("POST", createTaskGoalURL, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("name=" + title + "&startDate=" + today +
            "&endDate=" + dateString + "&tasksCompleted=" + numTasks);

        populateGoals();
    }
}

function createTimeGoal() {
    var title = document.getElementById("time-goal-name").value;
    var percent = parseFloat(document.getElementById("time-goal-percent").value);
    var date = document.getElementById("time-goal-date").value;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        console.log(request.resultText);
    }

    if(title != "" && percent >= 0.0 && percent <= 100 && date != ""){
        var dateString = dueDate.toISOString();
        request.open("POST", createTimeGoalURL, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("name=" + title + "&percent=" + percent + "&date=" + date);

        populateGoals();
    }
}

function completeTask(element){
    //element is the html checkbox
    var taskNum = element.value;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        console.log(request.resultText);
    }

    if(true){
        request.open("PUT", completeTaskURLBase + "/" + taskNum, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("taskId=" + taskNum);

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
