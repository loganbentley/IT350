<?php
// Autoload our dependencies with Composer
require '../vendor/autoload.php';

class Session extends TaskbeeModel {

protected $fillable = array('sessionId', 'startTime', 'endTime', 'timeOnTask', 'timeOffTask', 'sessionPercent', 'environmentId');

}

?>
