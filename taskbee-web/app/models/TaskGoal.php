<?php
// Autoload our dependencies with Composer
require '../vendor/autoload.php';

class TaskGoal extends TaskbeeModel {

protected $fillable = array('taskGoalId', 'userId', 'name', 'startDate', 'endDate', 'tasksCompleted', 'sessionId', 'created_at', 'updated_at');

}

?>
