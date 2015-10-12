<?php
// Autoload our dependencies with Composer
require '../vendor/autoload.php';

class Event extends TaskbeeModel {

protected $fillable = array('eventId', 'environmentId', 'startTime', 'endTime', 'totalTime', 'sessionId');

}

?>
