<?php
// Autoload our dependencies with Composer
require '../vendor/autoload.php';
require 'TaskbeeModel.php';

class User extends TaskbeeModel {

protected $fillable = array('userId', 'username', 'firstName', 'lastName', 'totalTimeWork', 'currentPercent', 'password');

  public static function authenticate($username, $password) {
    // Grab the user based on username
    $user = self::where('username', '=', $username)->firstOrFail();

    // Grab the salt based on userId
    $account = Account::where('userId', '=', $user->userId)->firstOrFail();

    $hashedPassword = md5($account->salt . $password);

    if ($hashedPassword === $user->password) {
      return $user;
    }
    else {
      return null;
    }
  }

}

?>
