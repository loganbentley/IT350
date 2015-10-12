<?php
// Autoload our dependencies with Composer
require '../vendor/autoload.php';

class User extends TaskbeeModel {

protected $fillable = array('userId', 'user', 'firstName', 'lastName', 'totalTimeWork', 'currentPercent');

}

?>
