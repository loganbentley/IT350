/* main.js
 * Javascript functions for main.html
 */

/* TEST VARIABLES */
var array_env = ["Work", "SchoolMWF", "SchoolTTh", "SocialMediaOnly"];
var array_taskNames = ["Project Name", "Do that one thing", "JUST DO IT!"];
var array_taskDates = ["10/25/2015", "11/1/2015", "10/21/2015"];
var array_tasksCompleted = ["Friends for dinner...", "I'm gonna have", "friends for dinner"];

/* HTML Snippits */

var tasksTableHeader = "<tr><th>&nbsp;</th><th>Task</th><th>Due</th></tr>";

/* Functions */

window.onload = function(){ //Start the accordion functionality
    $( "#accordion" ).accordion({
        collapsible: true, //Allow all sections to be closed simultaneously
        active: false, //Start with all sections closed
        animate: 100, //Speed up the animation to 100ms, default seems to be 200
        icons: { "header": "ui-icon-blank", "activeHeader": "ui-icon-blank" }
            //Blank icons
    }); 
    
    populateEnvironments();
    populateTasks();
    populateTasksCompleted();
    populateTaskGoals();
    populateTimeGoals();
}

function populateEnvironments(){
    
    var environments = "";
    
    for(i = 0; i < array_env.length; i++){
        environments += "<tr><td>" + array_env[i] + "</td>" + 
        "<td>" + 
        "<input type='button' class='env-button-start' onclick='' value='Start' />" +
        "<input type='button' class='env-button-stop hidden' onclick='' value='Stop' />" +
        "</td></tr>";
    }
    
    document.getElementById("env-table").innerHTML = environments;
}

function populateTasks(){
    var tasks = tasksTableHeader;
    
    for(i = 0; i < array_taskNames.length; i++){
        tasks += "<tr><td><input type='checkbox' /></td>" + 
        "<td>" + array_taskNames[i] + "</td>" + 
        "<td>" + array_taskDates[i] + "</td></tr>";
    }
    
    document.getElementById("tasks-table").innerHTML = tasks;
}

function populateTasksCompleted(){
    var completed = "";
    
    for(i = 0; i < array_tasksCompleted.length; i++){
        completed += "<tr><td>" + array_tasksCompleted[i] + "</td>" + 
        "<td>" + 
        "<input type='button' class='tasks-completed-reopen' onclick='' value='Reopen' />" + 
        "</td></tr>";
    }
    
    document.getElementById("tasks-table-completed").innerHTML = completed;
}

function populateTaskGoals(){
    
}

function populateTimeGoals(){
    
}