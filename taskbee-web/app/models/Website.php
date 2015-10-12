<?php
// Autoload our dependencies with Composer
require '../vendor/autoload.php';

class Website extends TaskbeeModel {

protected $fillable = array('websiteId', 'userId', 'domainName', 'lastAccessed', 'environmentId', 'type');

}

?>
