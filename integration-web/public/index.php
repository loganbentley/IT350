<?php
require '../vendor/autoload.php';
require '../app/models/IntegrationTable.php';

$app = new \Slim\Slim();

$app->post('/foo', function() {

  $comment = $_POST['comment'];

  $table = new IntegrationTable(array(
    'date' => time(),
    'comment' => $comment,
  ));
  $table->save();
});

$app->get('/foo', function() {
  $tables = IntegrationTable::all();
  echo '<pre>';
  print_r($tables);
  die;
});

$app->run();
?>
