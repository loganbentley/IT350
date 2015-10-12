<?php
// Autoload our dependencies with Composer
require '../vendor/autoload.php';

$settings = array(
    'driver'    => 'mysql',
    'host'      => 'localhost',
    'database'  => 'Integration',
    'username'  => 'integration',
    'password'  => 'this.is.integration',
    'collation' => 'utf8_general_ci',
    'prefix'    => '',
    'charset'	=> 'utf8'
);

$connFactory = new \Illuminate\Database\Connectors\ConnectionFactory(new Illuminate\Container\Container);
$conn = $connFactory->make($settings);

$resolver = new \Illuminate\Database\ConnectionResolver();
$resolver->addConnection('default', $conn);
$resolver->setDefaultConnection('default');
\Illuminate\Database\Eloquent\Model::setConnectionResolver($resolver);

class IntegrationTable extends \Illuminate\Database\Eloquent\Model {

  protected $fillable = array('date', 'comment');

}

 ?>
