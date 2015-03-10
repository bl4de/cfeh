<?php
/**
 * Created by PhpStorm.
 * User: rafal.janicki
 * Date: 2015-03-10
 * Time: 14:00
 */
// this is the main Server application

// here should be implemented some autoloader...
require_once("interfaces/FormatterInterface.php");
require_once("interfaces/ValidatorInterface.php");
require_once("interfaces/StoreEngineInterface.php");

require_once("classes/ServerClass.php");
require_once("classes/ValidatorClass.php");
require_once("classes/FormatterClass.php");
require_once("classes/StoreEngine.php");


// create some helper objects here:
$validator = new ValidatorClass();
$formatter = new FormatterClass();
$storeEngine = new StoreEngine();

$server = new ServerClass($validator, $formatter, $storeEngine);
$server->listen();

