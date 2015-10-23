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

$app->post('/login', function() {
  $username = $_POST['username'];
  $password = $_POST['password'];

  // If authenticate returns a user then they were authenticated. If not, authentication failed
  $user = User::authenticate($username, $password);
  if ($user !== null) {
    // Start session
    $_SESSION['userId'] = $user->id;
    echo json_encode(array('success' => 1));
  }
  else {
    // Return auth error
    echo json_encode(array('success' => 0));
  }

});


$app->run();
?>
