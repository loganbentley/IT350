<?php
require '../vendor/autoload.php';
require '../app/models/User.php';
require '../app/models/Account.php';

$app = new \Slim\Slim();

$app->get('/', function() {
  echo 'Default page';
});

$app->post('/signup', function() {
  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  $salt = md5(time());

  $hashedPassword = md5($salt . $password);

  $user = new User(array(
    'username' => $username,
    'firstName' => $firstName,
    'lastName' => $lastName,
    'password' => $hashedPassword,
  ));
  $user->save();

  $account = new Account(array(
    'userId' => $user->id,
    'salt' => $salt,
  ));
  $account->save();

});


$app->run();
?>
