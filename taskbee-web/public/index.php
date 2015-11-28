<?php
require '../vendor/autoload.php';
require '../app/models/User.php';
require '../app/models/Account.php';
require '../app/models/Task.php';
require '../app/models/Environment.php';
require '../app/models/Website.php';

$app = new \Slim\Slim();

$app->get('/', function() {
  echo 'Default page';
});

$app->get('/dashboard', function() {
  session_start();
  session_regenerate_id();
  if (isset($_SESSION['userId'])) {
    // username, all time percent,
    $userId = $_SESSION['userId'];
    $user = User::where('userId', '=', $userId)->get();
    $response = array();
    $response['success'] = 1;
    $response['user'] = $user->toArray();
    $response['user'][0]['password'] = null;
    echo json_encode($response);
  }
  else {
    echo json_encode(array('success' => 0));
  }
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

$app->get('/logout', function() {
  session_unset();
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

$app->post('/environment', function() {
  session_start();
  session_regenerate_id();
  if (isset($_SESSION['userId'])) {
    $name = $_POST['name'];
    $environment = new Environment(array(
      'name' => $name,
      'userId' => $_SESSION['userId'],
    ));
    $environment->save();
    $response['success'] = 1;
    $response['environment'] = $environment->toArray();
    echo json_encode($response);
  }
  else {
    echo json_encode(array('success' => 0));
  }
});

$app->get('/environment', function() {
  session_start();
  session_regenerate_id();
  if (isset($_SESSION['userId'])) {
    $userId = $_SESSION['userId'];
    $environments = Environment::where('userId', '=', $userId)->get();

    $response = array();
    $response['success'] = 1;
    $response['environments'] = $environments->toArray();
    echo json_encode($response);
  }
});

$app->get('/task', function() {
  session_start();
  session_regenerate_id();
  if (isset($_SESSION['userId'])) {
    $userId = $_SESSION['userId'];
    $tasks = Task::where('userId', '=', $userId)->get();

    $response = array();
    $response['success'] = 1;
    $response['tasks'] = $tasks->toArray();
    echo json_encode($response);
  }
});

$app->get('/website', function() {
  session_start();
  session_regenerate_id();
  if (isset($_SESSION['userId'])) {
    if (isset($_GET['environmentId'])) {
      $environmentId = $_GET['environmentId'];
      $websites = Website::where('environmentId', '=', $environmentId)->get();

      $response = array();
      $response['success'] = 1;
      $response['websites'] = $websites->toArray();
      echo json_encode($response);
    }
  }

});

$app->post('/website', function() {
  session_start();
  session_regenerate_id();
  if (isset($_SESSION['userId'])) {
    $url = $_POST['url'];
    $environmentId = $_POST['environmentId'];
    $website = new Website(array(
      'userId' => $_SESSION['userId'],
      'domainName' => $url,
      'environmentId' => $environmentId,
    ));

    $website->save();
    $response['success'] = 1;
    $response['website'] = $website->toArray();
    echo json_encode($response);
  }
  else {
    echo json_encode(array('success' => 0));
  }
});

$app->post('/toggleEnvironment', function() {
  session_start();
  session_regenerate_id();
  if (isset($_SESSION['userId'])) {
    $started = $_POST['active'];
    $environmentId = $_POST['environmentId'];
    Environment::where('environmentId', '=', $environmentId)
                ->update(array('active' => $started));

    $response['success'] = 1;
    echo json_encode($response);
  }
  else {
    echo json_encode(array('success' => 0));
  }
});

$app->post('/checkWebsite', function() {
  session_start();
  sessions_regenerate_id();
  if (isset($_SESSION['userId'])) {
    $url = $_POST['url'];
    // Need to check for an active session
    $session = Session::where('startTime', '<', time())
                        ->where('endTime', "!=", "NULL")
                        ->find();

	// If there is an active session, grab the environment and websites.
	// Compare the url to the urls of the websites.
	// If it is blacklisted, update the session accordingly.
    if (isset($session) && ! empty($session)) {
      echo 'HI';
    }
    else {
      echo 'HO';
    }

  }
});

$app->run();

?>
