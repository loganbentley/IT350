<?php
// Autoload our dependencies with Composer
require '../vendor/autoload.php';

class TimePeriod extends TaskbeeModel {

protected $fillable = array('timePeriodId', 'daysOfWeek', 'startTime', 'endTime', 'userId');

}

?>
