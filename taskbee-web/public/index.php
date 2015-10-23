<?php
require '../vendor/autoload.php';
require '../app/models/User.php';
require '../app/models/Account.php';
require '../app/models/Task.php';

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
    session_start();
    $_SESSION['userId'] = $user->userId;
    $reponse['success'] = 1;
    $response['user'] = $user->toArray();
    $response['user']['password'] = null;
    echo json_encode($response);
  }
  else {
    // Return auth error
    session_destroy();
    echo json_encode(array('success' => 0));
  }

});

$app->get('/active-session', function() {
  session_start();
  session_regenerate_id();
  if (isset($_SESSION['userId'])) {
    echo json_encode(array('success' => 1));
  }
  else {
    echo json_encode(array('success' => 0));
  }
});

$app->post('/task', function() {
  session_start();
  session_regenerate_id();
  if (isset($_SESSION['userId'])) {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $dueDate = $_POST['dueDate'];

    $task = new Task(array(
      'name' => $name,
      'description' => $description,
      'dueDate' => $dueDate,
      'completed' => 0,
      'userId' => $_SESSION['userId'],
    ));
    $task->save();

    $response['success'] = 1;
    $response['task'] = $task->toArray();
    echo json_encode($response);
  }
  else {
    echo json_encode(array('success' => 0));
  }

});

$app->put('/task', function() {

});

$app->run();

?>
