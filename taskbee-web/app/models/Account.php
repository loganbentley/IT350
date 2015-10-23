<?php
// Autoload our dependencies with Composer
require '../vendor/autoload.php';

class Account extends TaskbeeModel {

protected $fillable = array('accountId', 'userId', 'salt');

}

?>
