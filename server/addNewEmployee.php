<?php 
//include "db_connection.php";
include "Database.php";

$data = json_decode($_POST["x"] , false);

header("HTTP/1.1 200 OK");
$db = new Database();

//create a new message , passing the message data and the current user
$db->addNewEmployee($data);
?>