<?php
// Autoload our dependencies with Composer
require '../vendor/autoload.php';
require 'TaskbeeModel.php';

class User extends TaskbeeModel {

protected $fillable = array('userId', 'username', 'firstName', 'lastName', 'totalTimeWork', 'currentPercent', 'password');

}

?>
