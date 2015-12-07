<?php
// Autoload our dependencies with Composer
require '../vendor/autoload.php';

class TimeGoal extends TaskbeeModel {

protected $fillable = array('timeGoalId', 'userId', 'name', 'startTime', 'endTime', 'targetPercent', 'actualPercent', 'created_at', 'updated_at');

}

?>
