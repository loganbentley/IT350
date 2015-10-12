<?php
// Autoload our dependencies with Composer
require '../vendor/autoload.php';

class Environment extends TaskbeeModel {

protected $fillable = array('environmentId', 'userId', 'name');

}

?>
